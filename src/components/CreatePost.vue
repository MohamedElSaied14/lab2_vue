<template>
  <div>
    <StepOne v-if="step === 1" v-model="formData" @next="step = 2" />
    <StepTwo v-else-if="step === 2" :data="formData" @prev="step = 1" @submit="handleSubmit" />

    <SuccessPopup
      :show="showPopup"
      :data="formData"
      @view-students="$emit('go-students')"
      @create-new="resetForm"
    />
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import StepOne      from './StepOne.vue'
import StepTwo      from './StepTwo.vue'
import SuccessPopup from './SuccessPopup.vue'

const emit = defineEmits(['submitted', 'go-students'])

const step     = ref(1)
const showPopup = ref(false)

const formData = reactive({
  title: '', content: '', category: '',
  series: '', shareOn: [], shareImmediately: false,
})

function handleSubmit() {
  emit('submitted', { ...formData })
  showPopup.value = true
}

function resetForm() {
  showPopup.value = false
  step.value = 1
  Object.assign(formData, {
    title: '', content: '', category: '',
    series: '', shareOn: [], shareImmediately: false,
  })
}
</script>
