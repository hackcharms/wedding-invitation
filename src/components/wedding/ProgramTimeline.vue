<script setup lang="ts">
import { ref } from 'vue'
import type { TimelineEvent } from '@/types/wedding'

const timelineEvents = ref<TimelineEvent[]>([
  {
    time: '04:00 PM',
    title: 'Barat & Guest Arrival',
    description: "Welcoming the groom's procession and family.",
    icon: '✨'
  },
  {
    time: '05:00 PM',
    title: 'Solemnization of Nikah',
    description: 'The official marriage contract signing and blessings.',
    icon: '📖'
  },
  {
    time: '07:30 PM',
    title: 'Walima Dinner Reception',
    description: 'A grand celebratory feast with family and loved ones.',
    icon: '🍽️'
  }
])
</script>

<template>
  <section class="space-y-8 max-w-sm mx-auto w-full px-2">
    <div class="flex items-center justify-center gap-2 text-luxury-gold">
      <span class="text-xs">⏳</span>
      <h3 class="font-sans text-xs tracking-[0.25em] uppercase">Program Timeline</h3>
    </div>
    
    <div class="relative border-l border-luxury-gold/30 ml-4 pl-6 space-y-8 text-left">
      <div v-for="(event, index) in timelineEvents" :key="index" class="relative group">
        <span class="absolute -left-[31px] top-1 w-2.5 h-2.5 rounded-full bg-luxury-gold ring-4 ring-luxury-emerald transition-all duration-300 group-hover:scale-125 group-hover:bg-luxury-champagne group-hover:ring-luxury-gold/50"></span>
        <div class="space-y-1 transition-transform duration-300 group-hover:translate-x-1">
          <div class="flex items-center gap-2">
            <span class="font-mono text-xs text-luxury-gold font-medium tracking-wider">{{ event.time }}</span>
            <span class="text-[10px] filter grayscale group-hover:grayscale-0 transition-all">{{ event.icon }}</span>
          </div>
          <h5 class="text-sm font-serif font-medium text-white tracking-wide">{{ event.title }}</h5>
          <p class="text-xs text-gray-400 font-sans leading-relaxed">{{ event.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>