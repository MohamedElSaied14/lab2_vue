<template>
  <header class="app-header">
    <RouterLink class="logo" to="/students">📝 MyProject</RouterLink>
    <nav class="nav-links">
      <RouterLink to="/students">Students</RouterLink>
      <RouterLink to="/create">Create Post</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
  </header>
</template>

<script setup>
// Uses RouterLink — no props needed
</script>

<style scoped>
.app-header {
  background: #1a6ed8;
  padding: 0 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 56px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}
.logo {
  color: #fff;
  font-size: 1.1rem;
  font-weight: 700;
  text-decoration: none;
}
.nav-links { display: flex; gap: 4px; }
.nav-links a {
  color: rgba(255,255,255,0.8);
  text-decoration: none;
  padding: 8px 18px;
  border-radius: 4px;
  font-size: 0.9rem;
  transition: background 0.15s, color 0.15s;
}
.nav-links a:hover          { background: rgba(255,255,255,0.15); color: #fff; }
.nav-links a.router-link-active { background: rgba(255,255,255,0.25); color: #fff; font-weight: 600; }
</style>
