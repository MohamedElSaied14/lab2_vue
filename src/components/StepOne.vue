<template>
  <div class="step-form">
    <div class="step-indicator">
      <div class="step active">
        <span class="step-num">1</span>
        <span class="step-label">Fill Details</span>
      </div>
      <div class="step-line"></div>
      <div class="step">
        <span class="step-num">2</span>
        <span class="step-label">Review</span>
      </div>
    </div>

    <div class="form-body">
      <!-- Title -->
      <div class="form-group">
        <label>Title</label>
        <input v-model="local.title" placeholder="Enter post title" />
      </div>

      <!-- Content -->
      <div class="form-group">
        <label>Content</label>
        <textarea v-model="local.content" rows="3" placeholder="Enter post content"></textarea>
      </div>

      <!-- Category (radio) -->
      <div class="form-group">
        <label>Category</label>
        <div class="radio-group">
          <label v-for="cat in categories" :key="cat" class="radio-label">
            <input type="radio" :value="cat" v-model="local.category" />
            {{ cat }}
          </label>
        </div>
      </div>

      <!-- Series (select) -->
      <div class="form-group">
        <label>Series</label>
        <select v-model="local.series">
          <option value="">-- Select series --</option>
          <option v-for="s in seriesList" :key="s" :value="s">{{ s }}</option>
        </select>
      </div>

      <!-- Share On (checkboxes) -->
      <div class="form-group">
        <label>Share On</label>
        <div class="check-group">
          <label v-for="platform in platforms" :key="platform" class="check-label">
            <input type="checkbox" :value="platform" v-model="local.shareOn" />
            {{ platform }}
          </label>
        </div>
      </div>

      <!-- Share Immediately -->
      <div class="form-group inline-check">
        <label class="check-label big">
          <input type="checkbox" v-model="local.shareImmediately" />
          Share Immediately
        </label>
      </div>
    </div>

    <button class="btn-next" @click="goNext">Next →</button>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({
  modelValue: { type: Object, required: true }
})
const emit = defineEmits(['update:modelValue', 'next'])

const categories = ['Testing', 'Developing', 'Networking', 'Designing']
const seriesList  = ['Vue Series', 'React Series', 'JavaScript Series', 'CSS Series']
const platforms   = ['Facebook', 'Twitter', 'LinkedIN', 'Instagram']

// Local copy so edits don't propagate until Next
const local = reactive({ ...props.modelValue })

watch(local, (val) => {
  emit('update:modelValue', { ...val })
})

function goNext() {
  emit('next')
}
</script>

<style scoped>
.step-form {
  max-width: 680px;
  margin: 40px auto;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.10);
  padding: 36px 40px 28px;
}

/* Step indicator */
.step-indicator {
  display: flex;
  align-items: center;
  margin-bottom: 36px;
}
.step {
  display: flex;
  align-items: center;
  gap: 8px;
  opacity: 0.4;
}
.step.active { opacity: 1; }
.step-num {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #e0e0e0;
  color: #555;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.85rem;
}
.step.active .step-num { background: #1a6ed8; color: #fff; }
.step-label { font-size: 0.85rem; font-weight: 600; color: #333; }
.step-line {
  flex: 1;
  height: 2px;
  background: #e0e0e0;
  margin: 0 12px;
}

/* Form */
.form-group {
  margin-bottom: 20px;
}
.form-group > label:first-child {
  display: block;
  font-weight: 600;
  font-size: 0.9rem;
  color: #222;
  margin-bottom: 8px;
}

input[type="text"],
input:not([type="radio"]):not([type="checkbox"]),
textarea,
select {
  width: 100%;
  padding: 9px 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 0.9rem;
  outline: none;
  font-family: inherit;
  transition: border-color 0.2s;
  background: #fafafa;
}
input:focus, textarea:focus, select:focus { border-color: #1a6ed8; background: #fff; }

.radio-group, .check-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.radio-label, .check-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  color: #333;
  cursor: pointer;
}
.check-label.big { font-size: 0.95rem; font-weight: 600; }

.btn-next {
  width: 100%;
  padding: 12px;
  background: #1a6ed8;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 10px;
  transition: background 0.2s;
}
.btn-next:hover { background: #1558b0; }
</style>
