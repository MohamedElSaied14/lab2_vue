<template>
  <div class="detail-wrapper">
    <!-- Not found -->
    <div v-if="!student" class="not-found">
      <h2>Student not found</h2>
      <RouterLink to="/students" class="back-link">← Back to list</RouterLink>
    </div>

    <!-- Detail view / edit -->
    <div v-else class="detail-card">
      <div class="card-header">
        <RouterLink to="/students" class="back-link">← Back to list</RouterLink>
        <div class="header-actions">
          <button v-if="!editing" class="btn-edit" @click="startEdit">✏️ Edit</button>
          <button v-if="editing"  class="btn-save" @click="save">💾 Save</button>
          <button v-if="editing"  class="btn-cancel" @click="cancelEdit">Cancel</button>
        </div>
      </div>

      <div class="avatar">{{ initials }}</div>
      <h2 class="student-name">{{ student.name }}</h2>
      <span class="student-id">ID: {{ student.id }}</span>

      <div class="fields">
        <div class="field-row" v-for="field in fields" :key="field.key">
          <span class="field-label">{{ field.label }}</span>
          <span v-if="!editing" class="field-value">{{ student[field.key] || '—' }}</span>
          <input
            v-else
            v-model="form[field.key]"
            :placeholder="field.label"
            class="field-input"
            :class="{ error: errors[field.key] }"
          />
          <span v-if="editing && errors[field.key]" class="err-msg">{{ errors[field.key] }}</span>
        </div>
      </div>

      <!-- JSON data block -->
      <div class="json-block">
        <div class="json-header">
          <span>📄 JSON Data</span>
          <button class="btn-copy" @click="copyJSON">{{ copied ? '✅ Copied!' : '📋 Copy' }}</button>
        </div>
        <pre>{{ prettyJSON }}</pre>
      </div>

      <div class="danger-zone">
        <button class="btn-delete" @click="confirmDelete">🗑️ Delete Student</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStudents } from '../composables/useStudents.js'

const route  = useRoute()
const router = useRouter()
const { getById, updateStudent, deleteStudent } = useStudents()

const student = computed(() => getById(route.params.id))

const fields = [
  { key: 'name',  label: 'Full Name' },
  { key: 'city',  label: 'City'      },
  { key: 'email', label: 'Email'     },
  { key: 'phone', label: 'Phone'     },
]

const editing = ref(false)
const form    = reactive({ name: '', city: '', email: '', phone: '' })
const errors  = reactive({ name: '', city: '' })
const copied  = ref(false)

function startEdit() {
  Object.assign(form, {
    name:  student.value.name,
    city:  student.value.city,
    email: student.value.email || '',
    phone: student.value.phone || '',
  })
  errors.name = ''; errors.city = ''
  editing.value = true
}

function cancelEdit() { editing.value = false }

function save() {
  errors.name = ''; errors.city = ''
  let valid = true
  if (!form.name.trim()) { errors.name = 'Name is required.'; valid = false }
  if (!form.city.trim()) { errors.city = 'City is required.'; valid = false }
  if (!valid) return
  updateStudent(route.params.id, {
    name:  form.name.trim(),
    city:  form.city.trim(),
    email: form.email.trim(),
    phone: form.phone.trim(),
  })
  editing.value = false
}

function confirmDelete() {
  if (confirm(`Delete student "${student.value.name}"? This cannot be undone.`)) {
    deleteStudent(route.params.id)
    router.push('/students')
  }
}

const initials = computed(() => {
  if (!student.value) return '?'
  return student.value.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
})

const prettyJSON = computed(() => student.value ? JSON.stringify(student.value, null, 2) : '')

function copyJSON() {
  navigator.clipboard.writeText(prettyJSON.value).then(() => {
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  })
}
</script>

<style scoped>
.detail-wrapper {
  max-width: 620px;
  margin: 40px auto;
  padding: 0 16px;
}
.not-found {
  text-align: center;
  margin-top: 80px;
}
.not-found h2 { font-size: 1.6rem; color: #e03c3c; margin-bottom: 16px; }
.back-link {
  color: #1a6ed8;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 600;
}
.back-link:hover { text-decoration: underline; }

.detail-card {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  padding: 28px 32px;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}
.header-actions { display: flex; gap: 8px; }

.avatar {
  width: 72px; height: 72px;
  border-radius: 50%;
  background: #1a6ed8;
  color: #fff;
  font-size: 1.6rem; font-weight: 700;
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 12px;
}
.student-name {
  text-align: center;
  font-size: 1.4rem;
  font-weight: 700;
  color: #111;
  margin-bottom: 4px;
}
.student-id {
  display: block;
  text-align: center;
  color: #888;
  font-size: 0.85rem;
  margin-bottom: 24px;
}

.fields { margin-bottom: 24px; }
.field-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  padding: 12px 0;
  border-bottom: 1px solid #eee;
}
.field-row:last-child { border-bottom: none; }
.field-label { width: 110px; font-weight: 600; color: #555; font-size: 0.9rem; }
.field-value { flex: 1; color: #222; font-size: 0.95rem; }
.field-input {
  flex: 1;
  padding: 7px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 0.9rem;
  outline: none;
  transition: border-color 0.2s;
}
.field-input:focus { border-color: #1a6ed8; }
.field-input.error { border-color: #e03c3c; }
.err-msg { color: #e03c3c; font-size: 0.78rem; width: 100%; }

.json-block {
  background: #1e1e2e;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 24px;
}
.json-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 16px;
  background: #2a2a3e;
  color: #aaa;
  font-size: 0.85rem;
}
.json-block pre {
  color: #a8ff78;
  padding: 14px 18px;
  font-size: 0.82rem;
  line-height: 1.6;
  overflow-x: auto;
  margin: 0;
}

.danger-zone { text-align: center; }

/* Buttons */
.btn-edit   { background: #f0a500; color: #fff; border: none; padding: 8px 18px; border-radius: 4px; cursor: pointer; font-weight: 600; transition: background 0.2s; }
.btn-edit:hover { background: #d08a00; }
.btn-save   { background: #28a745; color: #fff; border: none; padding: 8px 18px; border-radius: 4px; cursor: pointer; font-weight: 600; }
.btn-save:hover { background: #1e7e34; }
.btn-cancel { background: #e0e0e0; color: #333; border: none; padding: 8px 18px; border-radius: 4px; cursor: pointer; font-weight: 600; }
.btn-cancel:hover { background: #c8c8c8; }
.btn-delete { background: #e03c3c; color: #fff; border: none; padding: 9px 24px; border-radius: 4px; cursor: pointer; font-weight: 600; font-size: 0.9rem; }
.btn-delete:hover { background: #b52a2a; }
.btn-copy { background: transparent; border: 1px solid #555; color: #aaa; padding: 4px 10px; border-radius: 4px; cursor: pointer; font-size: 0.78rem; }
.btn-copy:hover { background: #333; }
</style>
