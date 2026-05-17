<template>
  <div class="page-wrapper">
    <header class="page-header">
      <h1>welcome in our vue application</h1>
    </header>

    <main class="main-layout">
      <SideNav />
      <StudentTable
        :students="students"
        @open-modal="showModal = true"
        @delete-student="remove"
      />
    </main>

    <footer class="page-footer">
      <p>Copyrights &copy; reserved to open source students</p>
    </footer>

    <AddStudentModal
      :show="showModal"
      @add="add"
      @cancel="showModal = false"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SideNav         from './SideNav.vue'
import StudentTable    from './StudentTable.vue'
import AddStudentModal from './AddStudentModal.vue'
import { useStudents } from '../composables/useStudents.js'

const { students, addStudent, deleteStudent } = useStudents()
const showModal = ref(false)

function add(data) {
  addStudent(data)
  showModal.value = false
}
function remove(id) {
  deleteStudent(id)
}
</script>

<style scoped>
.page-wrapper { display: flex; flex-direction: column; min-height: calc(100vh - 56px); }
.page-header  { background: #F5B800; padding: 50px 20px; text-align: center; }
.page-header h1 { font-size: 1.8rem; font-weight: 700; color: #1a1a1a; }
.main-layout {
  display: flex; flex: 1; padding: 24px; gap: 20px;
  max-width: 1100px; width: 100%; margin: 0 auto;
}
.page-footer  { background: #00C8E8; padding: 30px 20px; text-align: center; }
.page-footer p { font-weight: 700; color: #1a1a1a; font-size: 0.95rem; }
</style>
