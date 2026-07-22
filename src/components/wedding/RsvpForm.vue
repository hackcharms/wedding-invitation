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
  totalGuests: 1,
  dietaryPreference: '',
  prayers: ''
})

const attendanceOptions = ref([
  { value: 'accept', label: 'Accepts with pleasure' },
  { value: 'decline', label: 'Declines with regret' }
])

const dietOptions = ref([
  { value: 'veg', label: 'Pure Vegetarian' },
  { value: 'non-veg', label: 'Non-Vegetarian / Halal' },
  { value: 'both', label: 'Mixed (For families)' }
])

// Traditional Indian headcount array (up to a family of 6)
const guestCountOptions = ref([
  { value: '1', label: '1 Person' },
  { value: '2', label: '2 People' },
  { value: '3', label: '3 People' },
  { value: '4', label: '4 People' },
  { value: '5', label: '5 People' },
  { value: '6', label: '6+ (Family Pack)' }
])

const processRSVP = (): void => {
  console.log(JSON.stringify(formData))
  alert(`Assalamu Alaikum ${formData.name}. Your family response has been recorded.`)
}
</script>

<template>
  <section class="max-w-sm mx-auto w-full p-6 bg-luxury-card/90 backdrop-blur-md rounded-xl border border-luxury-gold/20 shadow-xl">
    
    <div class="text-center mb-6">
      <span class="text-xs text-luxury-gold">💌</span>
      <h3 class="font-serif text-xs tracking-[0.25em] uppercase mt-1 text-transparent bg-clip-text bg-gradient-to-b from-white to-luxury-cream">
        Send Prayers &amp; RSVP
      </h3>
      <div class="w-12 h-[0.5px] bg-luxury-gold/30 mx-auto mt-2"></div>
    </div>
    
    <form @submit.prevent="processRSVP" class="space-y-4">
      <BaseInput 
        v-model="formData.name" 
        label="Primary Guest / Family Name"
        placeholder="e.g., Omar Khan &amp; Family"
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
        label="Will you honor us with your presence?"
        placeholder="Select attendance status..."
        :options="attendanceOptions"
        required
      />
      
      <div v-if="formData.attendance === 'accept'" class="space-y-4 pt-2 border-t border-white/[0.04] animate-fade-in">
        
        <BaseSelect 
          v-model="formData.totalGuests"
          label="Total Family Members Attending"
          placeholder="Select headcount..."
          :options="guestCountOptions"
          required
        />

        <BaseSelect 
          v-model="formData.dietaryPreference"
          label="Catering / Dietary Preference"
          placeholder="Select menu choice..."
          :options="dietOptions"
          required
        />

      </div>
      
      <div class="w-full space-y-1 font-sans text-xs">
        <label class="block text-gray-400 tracking-wider font-medium">Warm Wishes / Custom Prayers</label>
        <textarea 
          v-model="formData.prayers" 
          rows="3" 
          placeholder="May Allah bless this beautiful union..." 
          class="w-full bg-luxury-dark border border-white/10 rounded px-3 py-2 text-white font-sans focus:outline-none focus:border-luxury-gold transition-colors duration-200"
        ></textarea>
      </div>
      
      <BaseButton type="submit" variant="primary">
        Submit Response
      </BaseButton>
    </form>
  </section>
</template>

<style scoped>
/* Smooth transition entry for conditional Indian sub-fields */
.animate-fade-in {
  animation: fadeIn 0.35s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>