<template>
  <transition name="fade">
    <div class="overlay" v-if="show" @click.self="$emit('cancel')">
      <div class="modal">
        <h2>Add New Student</h2>

        <div class="form-group" v-for="field in fields" :key="field.key">
          <label>{{ field.label }}<span v-if="field.required" class="req">*</span></label>
          <input
            v-model="form[field.key]"
            :class="{ error: errors[field.key] }"
            :placeholder="field.placeholder"
            @input="errors[field.key] = ''"
          />
          <span class="err-msg" v-if="errors[field.key]">{{ errors[field.key] }}</span>
        </div>

        <div class="modal-actions">
          <button class="btn-add" @click="submit">Add</button>
          <button class="btn-cancel" @click="$emit('cancel')">Cancel</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({ show: { type: Boolean, required: true } })
const emit  = defineEmits(['add', 'cancel'])

const fields = [
  { key: 'name',  label: 'Name',  placeholder: 'Enter student name', required: true },
  { key: 'city',  label: 'City',  placeholder: 'Enter city',          required: true },
  { key: 'email', label: 'Email', placeholder: 'Enter email (optional)' },
  { key: 'phone', label: 'Phone', placeholder: 'Enter phone (optional)' },
]

const form   = reactive({ name: '', city: '', email: '', phone: '' })
const errors = reactive({ name: '', city: '' })

watch(() => props.show, val => {
  if (val) {
    Object.assign(form,   { name: '', city: '', email: '', phone: '' })
    Object.assign(errors, { name: '', city: '' })
  }
})

function submit() {
  errors.name = ''; errors.city = ''
  let valid = true
  if (!form.name.trim()) { errors.name = 'Name is required.'; valid = false }
  if (!form.city.trim()) { errors.city = 'City is required.'; valid = false }
  if (!valid) return
  emit('add', { name: form.name.trim(), city: form.city.trim(), email: form.email.trim(), phone: form.phone.trim() })
}
</script>

<style scoped>
.overlay {
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.45);
  display: flex; align-items: center; justify-content: center;
  z-index: 999;
}
.modal {
  background: #fff; border-radius: 8px;
  padding: 32px 28px; width: 380px;
  box-shadow: 0 8px 30px rgba(0,0,0,0.2);
}
.modal h2 { font-size: 1.2rem; font-weight: 700; margin-bottom: 22px; color: #111; }
.form-group { margin-bottom: 14px; }
.form-group label { display: block; font-size: 0.85rem; font-weight: 600; margin-bottom: 5px; color: #333; }
.req { color: #e03c3c; margin-left: 2px; }
.form-group input {
  width: 100%; padding: 9px 12px;
  border: 1px solid #ccc; border-radius: 4px;
  font-size: 0.9rem; outline: none; transition: border-color 0.2s;
}
.form-group input:focus { border-color: #1a6ed8; }
.form-group input.error { border-color: #e03c3c; }
.err-msg { color: #e03c3c; font-size: 0.78rem; margin-top: 4px; display: block; }
.modal-actions { display: flex; gap: 10px; margin-top: 22px; }
.modal-actions button {
  flex: 1; padding: 10px; border: none; border-radius: 4px;
  font-size: 0.9rem; font-weight: 600; cursor: pointer; transition: background 0.2s;
}
.btn-add    { background: #1a6ed8; color: #fff; }
.btn-add:hover { background: #1558b0; }
.btn-cancel { background: #e0e0e0; color: #333; }
.btn-cancel:hover { background: #c8c8c8; }
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
