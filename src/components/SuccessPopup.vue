<template>
  <transition name="pop">
    <div class="overlay" v-if="show">
      <div class="popup">
        <div class="icon">✅</div>
        <h3>Post Created!</h3>
        <p>
          <strong>{{ data.title }}</strong> has been added to the students table.
        </p>
        <div class="popup-actions">
          <button class="btn-view" @click="$emit('view-students')">View Students</button>
          <button class="btn-new"  @click="$emit('create-new')">Create Another</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
defineProps({
  show: { type: Boolean, required: true },
  data: { type: Object,  default: () => ({}) }
})
defineEmits(['view-students', 'create-new'])
</script>

<style scoped>
.overlay {
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex; align-items: center; justify-content: center;
  z-index: 9999;
}
.popup {
  background: #fff;
  border-radius: 12px;
  padding: 40px 36px;
  width: 380px;
  text-align: center;
  box-shadow: 0 12px 40px rgba(0,0,0,0.25);
}
.icon { font-size: 3.5rem; margin-bottom: 12px; }
h3 { font-size: 1.4rem; color: #1a6ed8; margin-bottom: 10px; }
p  { color: #555; font-size: 0.95rem; line-height: 1.6; margin-bottom: 28px; }
.popup-actions { display: flex; gap: 10px; }
.popup-actions button {
  flex: 1; padding: 11px;
  border: none; border-radius: 6px;
  font-size: 0.9rem; font-weight: 600;
  cursor: pointer; transition: background 0.2s;
}
.btn-view { background: #1a6ed8; color: #fff; }
.btn-view:hover { background: #1558b0; }
.btn-new  { background: #F5B800; color: #1a1a1a; }
.btn-new:hover { background: #d9a300; }

.pop-enter-active { animation: popIn 0.3s ease; }
.pop-leave-active { animation: popIn 0.2s ease reverse; }
@keyframes popIn {
  from { opacity: 0; transform: scale(0.85); }
  to   { opacity: 1; transform: scale(1); }
}
</style>
