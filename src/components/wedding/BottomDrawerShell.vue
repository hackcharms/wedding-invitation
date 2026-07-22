<script setup lang="ts">
import { ref } from 'vue'
import ProgramTimeline from '@/components/wedding/ProgramTimeline.vue'
import AddToCalendar from '@/components/wedding/AddToCalendar.vue'
import RsvpForm from '@/components/wedding/RsvpForm.vue'
import GoldDivider from '@/components/ui/GoldDivider.vue'

defineProps<{ isOpen: boolean }>()
const emit = defineEmits(['close'])

const startY = ref(0)
const currentY = ref(0)

// Swipe-to-dismiss behavior for mobile viewports
const touchStart = (e: TouchEvent) => {
  startY.value = e.touches[0].clientY
}
const touchMove = (e: TouchEvent) => {
  currentY.value = e.touches[0].clientY
  if (currentY.value - startY.value > 100) {
    emit('close')
  }
}
</script>

<template>
  <div>
    <!-- Backdrop Shading Layer Wrap -->
    <div 
      class="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-500"
      :class="isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'"
      @click="emit('close')"
    ></div>

    <!-- Sliding Sheet Body Canvas -->
    <div 
      class="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-luxury-card/95 border-t border-luxury-gold/30 rounded-t-[2.5rem] z-50 h-[82vh] overflow-y-auto transition-transform duration-500 ease-out p-6 pt-3 shadow-premium select-text"
      :class="isOpen ? 'translate-y-0' : 'translate-y-full'"
      @touchstart="touchStart"
      @touchmove="touchMove"
    >
      <!-- Center Pill Header Indicator Frame Touch Anchor -->
      <div class="w-12 h-1 bg-white/20 rounded-full mx-auto mb-6 cursor-grab active:cursor-grabbing" @click="emit('close')"></div>

      <!-- Scrollable Feature Block Stream Context -->
      <div class="space-y-10 pb-16">
        
        <ProgramTimeline />

        <AddToCalendar />

        <GoldDivider />

        <!-- VENUE INFO SECTION -->
        <section class="space-y-4">
          <div class="flex flex-col items-center justify-center space-y-1 text-center">
            <div class="text-luxury-gold text-lg">📍</div>
            <h3 class="font-serif text-[13px] tracking-[0.3em] uppercase text-luxury-cream">Venue</h3>
            <h4 class="text-sm font-serif text-white pt-1">Grand Palace Hall</h4>
            <p class="text-[10px] font-sans tracking-wider text-gray-400 uppercase">Gokuldham, Mumbai</p>
          </div>

          <div class="w-full max-w-[300px] mx-auto aspect-video rounded-lg overflow-hidden border border-luxury-gold/20 shadow-lg relative">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m4!2s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C+Maharashtra!5m2!1sen!2sin" 
              class="w-full h-full border-0 absolute inset-0 filter invert-[90%] hue-rotate-[150deg] saturate-[60%] contrast-[95%]" 
              allowfullscreen="false" loading="lazy"
            ></iframe>
          </div>

          <div class="flex items-center justify-center gap-3 text-[9px] tracking-widest uppercase font-sans">
            <a href="https://maps.google.com" target="_blank" class="px-3 py-1.5 border border-luxury-gold/30 bg-luxury-dark/50 rounded text-luxury-gold hover:bg-luxury-gold hover:text-luxury-dark transition-all">Google Maps</a>
            <a href="https://maps.apple.com" target="_blank" class="px-3 py-1.5 border border-luxury-gold/30 bg-luxury-dark/50 rounded text-luxury-gold hover:bg-luxury-gold hover:text-luxury-dark transition-all">Apple Maps</a>
          </div>
        </section>

        <GoldDivider />

        <RsvpForm />
        
        <!-- Close Window Sheet Anchor Button -->
        <div class="text-center pt-2">
          <button @click="emit('close')" class="text-[9px] tracking-[0.3em] uppercase text-gray-500 hover:text-luxury-gold transition-colors font-sans cursor-pointer">
            ✕ Close Details
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
/* Prevent scrolling on the underlying page frame context layout boundary when drawer is expanded */
::-webkit-scrollbar {
  width: 4px;
}
::-webkit-scrollbar-thumb {
  background: rgba(212, 175, 55, 0.2);
  border-radius: 9px;
}
</style>