<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { RSVPPayload } from '@/types/wedding'
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseSelect from '@/components/ui/BaseSelect.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

const formData = reactive<RSVPPayload>({
  name: '',
  email: '',
  attendance: '',
  prayers: ''
})

const attendanceOptions = ref([
  { value: 'accept', label: 'Accepts with pleasure' },
  { value: 'decline', label: 'Declines with regret' }
])

const processRSVP = (): void => {
  console.log(JSON.stringify(formData))
  alert(`Assalamu Alaikum ${formData.name}. Your response has been recorded.`)
}
</script>

<template>
  <section class="max-w-sm mx-auto w-full p-6 bg-theme-obsidian/90 rounded-xl border border-theme-gold/20 shadow-xl">
    <div class="text-center mb-6">
      <span class="text-xs text-theme-gold">💌</span>
      <h3 class="font-serif text-xs tracking-[0.25em] uppercase mt-1 text-theme-gold-light">Send Prayers &amp; RSVP</h3>
    </div>
    
    <form @submit.prevent="processRSVP" class="space-y-4">
      <BaseInput 
        v-model="formData.name" 
        label="Your Full Name"
        placeholder="e.g., Omar Khan"
        required
      />

      <BaseInput 
        v-model="formData.email" 
        type="email"
        label="Email Address"
        placeholder="you@example.com"
        required
      />

      <BaseSelect 
        v-model="formData.attendance"
        label="Will you attend?"
        placeholder="Select option..."
        :options="attendanceOptions"
        required
      />
      
      <div class="w-full space-y-1 font-sans text-xs">
        <label class="block text-gray-400 tracking-wider font-medium">Warm Wishes / Prayers</label>
        <textarea 
          v-model="formData.prayers" 
          rows="3" 
          placeholder="May Allah bless this union..." 
          class="w-full bg-theme-emerald border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-theme-gold transition-colors duration-200"
        ></textarea>
      </div>
      
      <BaseButton type="submit" variant="primary">
        Submit RSVP
      </BaseButton>
    </form>
  </section>
</template>