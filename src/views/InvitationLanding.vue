<script setup lang="ts">
import { ref } from 'vue'
import ShutterReveal from '@/components/wedding/ShutterReveal.vue'
import ScratchCard from '@/components/wedding/ScratchCard.vue'
import CountdownTimer from '@/components/wedding/CountdownTimer.vue'
import ProgramTimeline from '@/components/wedding/ProgramTimeline.vue'
import AddToCalendar from '@/components/wedding/AddToCalendar.vue'
import DressCode from '@/components/wedding/DressCode.vue'
import RsvpForm from '@/components/wedding/RsvpForm.vue'
import GoldDivider from '@/components/ui/GoldDivider.vue'
import BackgroundMusic from '@/components/wedding/BackgroundMusic.vue'

import { useCountdown } from '@/composables/useCountdown'

const appUnlocked = ref(false)
const { timeRemaining } = useCountdown('2027-08-21T12:30:00')
</script>

<template>
  <div class="min-h-screen bg-luxury-dark text-luxury-cream overflow-x-hidden relative">
    
    <!-- Immersive Audio Module Layer -->
    <BackgroundMusic v-if="appUnlocked" />

    <ShutterReveal @unlocked="appUnlocked = true" />

    <main v-if="appUnlocked" class="max-w-md mx-auto px-6 py-16 space-y-12 text-center relative z-10">
      
      <!-- HERO CONTENT HEADER -->
      <header class="space-y-4 pt-4">
        <div class="text-luxury-gold text-xl tracking-widest filter drop-shadow">﷽</div>
        <h1 class="text-4xl font-serif font-light tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-white to-luxury-gold py-2">
          Zain &amp; Aisha
        </h1>
        <p class="font-sans text-[10px] tracking-[0.2em] uppercase text-gray-400">Request the honour of your presence</p>
      </header>

      <GoldDivider />

      <ScratchCard />

      <GoldDivider />

      <!-- STEP 1: SCHEDULING TIMELINE -->
      <ProgramTimeline />


      <!-- STEP 3: SAVE TO SYSTEM DIARIES (Placed cleanly right before maps) -->
      <AddToCalendar />

      <GoldDivider />

      <!-- STEP 4: VENUE & MULTI-APP NAVIGATION LINERS -->
      <section class="space-y-4">
        <div class="flex flex-col items-center justify-center space-y-1">
          <div class="text-luxury-gold text-lg">📍</div>
          <h3 class="font-serif text-[13px] tracking-[0.3em] uppercase text-luxury-cream">Venue</h3>
          <h4 class="text-sm font-serif text-white pt-1">Grand Palace Hall</h4>
          <p class="text-[10px] font-sans tracking-wider text-gray-400 uppercase">Gokuldham, Mumbai</p>
        </div>

        <!-- Clean Darkened Map Viewport -->
        <div class="w-full max-w-[300px] mx-auto aspect-video rounded-lg overflow-hidden border border-luxury-gold/20 shadow-premium relative">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m4!2s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C+Maharashtra!5m2!1sen!2sin" 
            class="w-full h-full border-0 absolute inset-0 filter invert-[90%] hue-rotate-[150deg] saturate-[60%] contrast-[95%]" 
            allowfullscreen="false" loading="lazy"
          ></iframe>
        </div>

        <!-- Alternate Navigation Routing Actions Layout -->
        <div class="flex items-center justify-center gap-3 pt-1 text-[9px] font-sans tracking-widest uppercase">
          <a 
            href="https://maps.google.com" 
            target="_blank" 
            class="px-3 py-1.5 border border-luxury-gold/30 bg-luxury-card/30 rounded text-luxury-gold hover:bg-luxury-gold hover:text-luxury-dark transition-all duration-300"
          >
            Google Maps
          </a>
          <a 
            href="https://maps.apple.com" 
            target="_blank" 
            class="px-3 py-1.5 border border-luxury-gold/30 bg-luxury-card/30 rounded text-luxury-gold hover:bg-luxury-gold hover:text-luxury-dark transition-all duration-300"
          >
            Apple Maps
          </a>
        </div>
      </section>

      <GoldDivider />

      <!-- STEP 5: COUNTDOWN & RSVP RESPONSE ACTION -->
      <CountdownTimer :time-data="timeRemaining" />

      <RsvpForm />

      <footer class="pt-8 text-[9px] font-sans tracking-[0.2em] text-gray-600 uppercase">
        We Can't Wait To Celebrate With You!
      </footer>

    </main>
  </div>
</template>