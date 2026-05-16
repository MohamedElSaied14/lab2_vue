<template>
  <div class="success-page">
    <div class="success-card">
      <div class="success-icon">✅</div>
      <h2>Post Submitted!</h2>
      <p>Your post has been successfully submitted.</p>
      <button @click="$emit('reset')">Create Another Post</button>
    </div>
  </div>
</template>

<script setup>
defineEmits(['reset'])
</script>

<style scoped>
.success-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
}
.success-card {
  text-align: center;
  background: #fff;
  border-radius: 12px;
  padding: 60px 48px;
  box-shadow: 0 2px 20px rgba(0,0,0,0.10);
}
.success-icon { font-size: 4rem; margin-bottom: 16px; }
h2 { color: #1a6ed8; font-size: 1.6rem; margin-bottom: 10px; }
p  { color: #555; margin-bottom: 28px; }
button {
  background: #1a6ed8;
  color: #fff;
  border: none;
  padding: 11px 32px;
  border-radius: 6px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
button:hover { background: #1558b0; }
</style>
