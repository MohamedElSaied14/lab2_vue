<template>
  <nav class="side-nav">
    <a
      v-for="item in navItems"
      :key="item"
      :class="{ active: activeItem === item }"
      @click="activeItem = item"
    >
      {{ item }}
    </a>
  </nav>
</template>

<script setup>
import { ref } from 'vue'

const navItems = ['Home']
const activeItem = ref('Contact')
</script>

<style scoped>
.side-nav {
  width: 240px;
  flex-shrink: 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #fff;
  overflow: hidden;
  height: fit-content;
}
.side-nav a {
  display: block;
  padding: 14px 20px;
  color: #1a6ed8;
  text-decoration: none;
  border-bottom: 1px solid #e0e0e0;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background 0.15s;
}
.side-nav a:last-child { border-bottom: none; }
.side-nav a:hover { background: #f0f5ff; }
.side-nav a.active { background: #1a6ed8; color: #fff; }
</style>
