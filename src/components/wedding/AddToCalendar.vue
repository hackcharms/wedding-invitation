<script setup lang="ts">
import { ref } from 'vue'
import { generateGoogleCalendarUrl, generateIcalDataUrl, type CalendarEventData } from '@/utils/calendarGenerator'

// Centralized Event Specifications
const weddingEventData = ref<CalendarEventData>({
  title: 'Zain & Aisha - Wedding Ceremony & Reception',
  description: 'Join us as we celebrate our union. Please arrive early for the Guest Arrival and Barat at 4:00 PM.',
  location: 'Grand Palace Hall, Gokuldham Society, Mumbai',
  startDate: '20270821T160000', // Aug 21, 2027 at 16:00 (4 PM)
  endDate: '20270821T233000'   // Concludes around 11:30 PM
})

const googleUrl = generateGoogleCalendarUrl(weddingEventData.value)
const icalUrl = generateIcalDataUrl(weddingEventData.value)
</script>

<template>
  <div class="max-w-xs mx-auto w-full p-4 bg-luxury-card/40 border border-luxury-gold/10 rounded-xl space-y-4 text-center">
    <div class="space-y-1">
      <span class="text-lg text-luxury-gold">📅</span>
      <h4 class="font-serif text-lg tracking-[0.2em] uppercase text-white">Save The Celebration</h4>
      <p class="text-base text-gray-400 font-sans">Add our wedding timeline directly to your personal organizer.</p>
    </div>

    <!-- Dual Action Platform Matrix Buttons -->
    <div class="grid grid-cols-2 gap-2 pt-1 font-sans text-sm tracking-widest uppercase font-medium">
      
      <!-- Google Calendar Context -->
      <a 
        :href="googleUrl" 
        target="_blank"
        class="flex items-center justify-center gap-1.5 py-2 border border-luxury-gold/30 rounded bg-luxury-dark/40 text-luxury-gold hover:bg-luxury-gold hover:text-luxury-dark transition-all duration-300"
      >
        <span>Google</span>
      </a>

      <!-- Apple & Outlook ICS Engine Context -->
      <a 
        :href="icalUrl" 
        download="zain-aisha-wedding.ics"
        class="flex items-center justify-center gap-1.5 py-2 border border-luxury-gold/30 rounded bg-luxury-dark/40 text-luxury-gold hover:bg-luxury-gold hover:text-luxury-dark transition-all duration-300"
      >
        <span>Apple / iCal</span>
      </a>

    </div>
  </div>
</template>