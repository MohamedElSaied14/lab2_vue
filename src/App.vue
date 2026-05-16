<template>
  <div class="app">
    <AppHeader :currentPage="currentPage" @navigate="currentPage = $event" />

    <main>
      <StudentsPage
        v-if="currentPage === 'students'"
        :students="students"
        @add-student="addStudent"
        @delete-student="deleteStudent"
      />

      <CreatePost
        v-else-if="currentPage === 'create'"
        @submitted="onPostSubmitted"
        @go-students="currentPage = 'students'"
      />

      <div v-else class="about-page">
        <h2>About</h2>
        <p>A simple Vue 3 multi-step form demo.</p>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AppHeader   from './components/AppHeader.vue'
import StudentsPage from './components/StudentsPage.vue'
import CreatePost  from './components/CreatePost.vue'

const currentPage = ref('students')

// Shared students list
const students = ref([
  { id: 100, name: 'Mario',         city: 'Assiut'     },
  { id: 200, name: 'Abd el rahman', city: 'Cairo'      },
  { id: 300, name: 'Islam',         city: 'Alexandria' },
  { id: 400, name: 'Gehad',         city: 'Minia'      },
  { id: 500, name: 'Nourhan',       city: 'Aswan'      },
])

let nextId = 600

// Add from student modal (AddStudentModal)
function addStudent({ name, city }) {
  students.value.push({ id: nextId, name, city })
  nextId += 100
}

// Add from Create Post form — uses title as name, category as city
function onPostSubmitted(data) {
  students.value.push({
    id:   nextId,
    name: data.title    || 'Untitled',
    city: data.category || 'N/A',
  })
  nextId += 100
}

function deleteStudent(id) {
  students.value = students.value.filter(s => s.id !== id)
}
</script>

<style>
* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  font-family: 'Segoe UI', sans-serif;
  background: #f0f4f8;
  min-height: 100vh;
}
.app { display: flex; flex-direction: column; min-height: 100vh; }

.about-page {
  max-width: 680px; margin: 80px auto; text-align: center;
}
.about-page h2 { font-size: 2rem; color: #1a6ed8; margin-bottom: 14px; }
.about-page p  { color: #555; font-size: 1.05rem; }
</style>
