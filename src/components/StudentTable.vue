<template>
  <div class="table-area">
    <div class="table-toolbar">
      <button class="add-btn" @click="$emit('open-modal')">+ Add Student</button>
    </div>
    <table>
      <thead>
        <tr><th>ID</th><th>Name</th><th>City</th><th>Email</th><th>Actions</th></tr>
      </thead>
      <tbody>
        <tr v-for="student in students" :key="student.id">
          <td>{{ student.id }}</td>
          <td>
            <RouterLink :to="`/students/${student.id}`" class="name-link">
              {{ student.name }}
            </RouterLink>
          </td>
          <td>{{ student.city }}</td>
          <td>{{ student.email || '—' }}</td>
          <td class="actions-cell">
            <RouterLink :to="`/students/${student.id}`" class="btn-view">View</RouterLink>
            <button class="del-btn" @click="$emit('delete-student', student.id)">Delete</button>
          </td>
        </tr>
        <tr v-if="students.length === 0">
          <td colspan="5" class="empty-msg">No students yet. Click "+ Add Student" to begin.</td>
        </tr>
      </tbody>
      <tfoot>
        <tr><td colspan="5"># of students: {{ students.length }}</td></tr>
      </tfoot>
    </table>
  </div>
</template>

<script setup>
defineProps({ students: { type: Array, required: true } })
defineEmits(['open-modal', 'delete-student'])
</script>

<style scoped>
.table-area { flex: 1; }
.table-toolbar { display: flex; justify-content: flex-end; margin-bottom: 12px; }
.add-btn {
  background: #1a6ed8; color: #fff; border: none;
  padding: 9px 22px; border-radius: 4px;
  cursor: pointer; font-size: 0.9rem; font-weight: 600; transition: background 0.2s;
}
.add-btn:hover { background: #1558b0; }
table { width: 100%; border-collapse: collapse; background: #fff; border: 1px solid #ccc; }
thead tr { border-bottom: 2px solid #111; }
th { padding: 14px 16px; text-align: center; font-weight: 700; font-size: 0.95rem; color: #111; }
tbody tr:nth-child(odd)  { background: #f0f0f0; }
tbody tr:nth-child(even) { background: #fff; }
td { padding: 12px 16px; text-align: center; font-size: 0.9rem; color: #333; }
tfoot td { padding: 14px 20px; font-weight: 700; text-align: center; border-top: 2px solid #111; font-size: 0.95rem; }
.actions-cell { display: flex; gap: 6px; justify-content: center; align-items: center; }
.name-link { color: #1a6ed8; font-weight: 600; text-decoration: none; }
.name-link:hover { text-decoration: underline; }
.btn-view {
  background: #28a745; color: #fff; border: none;
  padding: 5px 12px; border-radius: 3px; cursor: pointer;
  font-size: 0.82rem; text-decoration: none; transition: background 0.2s;
}
.btn-view:hover { background: #1e7e34; }
.del-btn {
  background: #e03c3c; color: #fff; border: none;
  padding: 5px 14px; border-radius: 3px; cursor: pointer; font-size: 0.82rem; transition: background 0.2s;
}
.del-btn:hover { background: #b52a2a; }
.empty-msg { color: #999; font-style: italic; }
</style>
