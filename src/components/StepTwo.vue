<template>
  <div class="step-review">
    <div class="step-indicator">
      <div class="step">
        <span class="step-num">1</span>
        <span class="step-label">Fill Details</span>
      </div>
      <div class="step-line"></div>
      <div class="step active">
        <span class="step-num">2</span>
        <span class="step-label">Review</span>
      </div>
    </div>

    <h2 class="review-title">User Data</h2>

    <div class="review-body">
      <div class="review-row">
        <span class="review-key">Title :</span>
        <span class="review-val">{{ data.title || '—' }}</span>
      </div>
      <div class="review-row">
        <span class="review-key">Content :</span>
        <span class="review-val">{{ data.content || '—' }}</span>
      </div>
      <div class="review-row">
        <span class="review-key">Category :</span>
        <span class="review-val">{{ data.category || '—' }}</span>
      </div>
      <div class="review-row">
        <span class="review-key">Series :</span>
        <span class="review-val">{{ data.series || '—' }}</span>
      </div>
      <div class="review-row">
        <span class="review-key">Share Immediately :</span>
        <span class="review-val">{{ data.shareImmediately ? 'Yes' : 'No' }}</span>
      </div>
      <div class="review-row">
        <span class="review-key">Share On :</span>
        <span class="review-val">{{ data.shareOn.length ? data.shareOn.join(', ') : '—' }}</span>
      </div>
    </div>

    <div class="review-actions">
      <button class="btn-prev" @click="$emit('prev')">← Prev</button>
      <button class="btn-submit" @click="$emit('submit')">Submit</button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  data: { type: Object, required: true }
})
defineEmits(['prev', 'submit'])
</script>

<style scoped>
.step-review {
  max-width: 680px;
  margin: 40px auto;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.10);
  padding: 36px 40px 28px;
  border: 2px solid #e8f0ff;
}

/* Step indicator */
.step-indicator {
  display: flex;
  align-items: center;
  margin-bottom: 28px;
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

.review-title {
  text-align: center;
  color: #1a6ed8;
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 28px;
}

.review-body {
  border: 1px solid #dce8ff;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 24px;
}

.review-row {
  display: flex;
  padding: 13px 20px;
  border-bottom: 1px solid #eef2ff;
  font-size: 0.9rem;
}
.review-row:last-child { border-bottom: none; }
.review-row:nth-child(odd) { background: #f7f9ff; }

.review-key {
  color: #1a6ed8;
  font-weight: 600;
  width: 170px;
  flex-shrink: 0;
}
.review-val { color: #333; }

.review-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.btn-prev, .btn-submit {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-prev   { background: #1a6ed8; color: #fff; }
.btn-prev:hover { background: #1558b0; }

.btn-submit { background: #F5B800; color: #1a1a1a; }
.btn-submit:hover { background: #d9a300; }
</style>
