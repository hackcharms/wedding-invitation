<script setup lang="ts">
import { ref } from 'vue'
import type { TimelineEvent } from '@/types/wedding'

const timelineEvents = ref<TimelineEvent[]>([
  {
    time: '6:30 PM',
    title: 'Guest Arrival & Welcome',
    description: 'A warm reception for family and friends as they gather in prayer and celebration.',
    icon: '✨'
  },
  {
    time: '7:00 PM',
    title: 'Walima Reception',
    description: 'A blessed evening of dua, joy, and togetherness in honor of the newlyweds.',
    icon: '🤲'
  },
  {
    time: '8:15 PM',
    title: 'Dinner & Festive Gathering',
    description: 'A grand dinner and heartfelt moments shared with loved ones in celebration.',
    icon: '🍽️'
  }
])
</script>

<template>
  <section class="max-w-xs mx-auto w-full px-2 space-y-8">
    
    <div class="flex flex-col items-center justify-center space-y-1">
      <div class="text-luxury-gold text-lg">⏳</div>
      <h3 class="font-serif text-[13px] tracking-[0.3em] uppercase text-transparent bg-clip-text bg-gradient-to-b from-white to-luxury-cream">
        Program Timeline
      </h3>
      <div class="w-16 h-[0.5px] bg-luxury-gold/30"></div>
    </div>
    
    <div class="relative pl-8 space-y-6 text-left border-l-[0.75px] border-luxury-gold/40 ml-3">
      
      <div 
        v-for="(event, index) in timelineEvents" 
        :key="index" 
        class="relative transition-all duration-300 hover:translate-x-0.5"
      >
        <span class="absolute -left-[36.5px] top-1 w-2.5 h-2.5 rounded-full bg-luxury-gold border-2 border-luxury-dark shadow-gold-glow"></span>
        
        <div class="space-y-0.5">
          <div class="flex items-center gap-2 font-mono text-[11px] text-luxury-gold/90 font-medium">
            <span>{{ event.time }}</span>
            <span class="text-[10px] opacity-40">{{ event.icon }}</span>
          </div>
          
          <h4 class="text-sm font-serif font-semibold text-white tracking-wide">
            {{ event.title }}
          </h4>
          
          <p class="text-[11px] text-gray-400 font-sans leading-relaxed tracking-wide pr-2">
            {{ event.description }}
          </p>
        </div>
      </div>

    </div>

  </section>
</template>