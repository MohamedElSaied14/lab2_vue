// src/composables/useStudents.js
// Central store: persists to localStorage as JSON

import { ref } from 'vue'

const STORAGE_KEY = 'vue-students-db'

const DEFAULT_STUDENTS = [
  { id: 100, name: 'Mario',         city: 'Assiut',     email: 'mario@example.com',     phone: '010-0000001' },
  { id: 200, name: 'Abd el rahman', city: 'Cairo',      email: 'abdo@example.com',      phone: '010-0000002' },
  { id: 300, name: 'Islam',         city: 'Alexandria', email: 'islam@example.com',     phone: '010-0000003' },
  { id: 400, name: 'Gehad',         city: 'Minia',      email: 'gehad@example.com',     phone: '010-0000004' },
  { id: 500, name: 'Nourhan',       city: 'Aswan',      email: 'nourhan@example.com',   phone: '010-0000005' },
]

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed) && parsed.length > 0) return parsed
    }
  } catch (_) { /* ignore */ }
  return DEFAULT_STUDENTS.map(s => ({ ...s }))
}

function saveToStorage(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
}

// Singleton reactive state
const students = ref(loadFromStorage())
let nextId = students.value.length
  ? Math.max(...students.value.map(s => s.id)) + 100
  : 600

// ── CRUD ──────────────────────────────────────────────────────────────

export function useStudents() {
  function getAll() {
    return students.value
  }

  function getById(id) {
    return students.value.find(s => s.id === Number(id)) || null
  }

  function addStudent({ name, city, email = '', phone = '' }) {
    const student = { id: nextId, name: name.trim(), city: city.trim(), email: email.trim(), phone: phone.trim() }
    students.value.push(student)
    nextId += 100
    saveToStorage(students.value)
    return student
  }

  function updateStudent(id, fields) {
    const idx = students.value.findIndex(s => s.id === Number(id))
    if (idx === -1) return false
    students.value[idx] = { ...students.value[idx], ...fields }
    saveToStorage(students.value)
    return true
  }

  function deleteStudent(id) {
    students.value = students.value.filter(s => s.id !== Number(id))
    saveToStorage(students.value)
  }

  function exportJSON() {
    return JSON.stringify(students.value, null, 2)
  }

  return { students, getAll, getById, addStudent, updateStudent, deleteStudent, exportJSON }
}
