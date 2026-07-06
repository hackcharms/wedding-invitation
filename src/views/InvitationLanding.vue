<script setup>
import { ref } from 'vue'
import ShutterReveal from '@/components/wedding/ShutterReveal.vue'
import ScratchCard from '@/components/wedding/ScratchCard.vue'
import CountdownTimer from '@/components/wedding/CountdownTimer.vue'
import ProgramTimeline from '@/components/wedding/ProgramTimeline.vue'
import RsvpForm from '@/components/wedding/RsvpForm.vue'

import { useCountdown } from '@/composables/useCountdown'

const appUnlocked = ref(false)
const { timeRemaining } = useCountdown('2027-08-21T16:00:00')

const handleGateUnlocked = () => {
  appUnlocked.value = true
}
</script>

<template>
  <div class="min-h-screen bg-luxury-emerald text-gray-200 overflow-x-hidden">
    
    <ShutterReveal @unlocked="handleGateUnlocked" />

    <main v-if="appUnlocked" class="max-w-xl mx-auto px-4 py-12 space-y-16 animate-fade-in">
      
      <section class="text-center space-y-4">
        <div class="text-luxury-gold text-2xl">﷽</div>
        <h1 class="text-4xl font-serif tracking-wide text-luxury-champagne">Zain &amp; Aisha</h1>
      </section>

      <ScratchCard />

      <CountdownTimer :time-data="timeRemaining" />

      <ProgramTimeline />

      <RsvpForm />

    </main>
  </div>
</template>