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
  <section class="mx-auto w-full max-w-[560px] px-3 text-center">
    <div class="mb-7 flex flex-col items-center justify-center space-y-2">
      <div class="text-lg text-luxury-gold">⏳</div>
      <h3 class="bg-gradient-to-b from-white to-luxury-cream bg-clip-text font-serif text-lg uppercase tracking-[0.3em] text-transparent">
        Program Timeline
      </h3>
      <div class="h-[0.5px] w-16 bg-luxury-gold/30"></div>
    </div>

    <div class="relative mx-auto max-w-[470px] pl-7 text-left">
      <div class="absolute left-2.5 top-1 bottom-1 w-px bg-gradient-to-b from-luxury-gold/0 via-luxury-gold/55 to-luxury-gold/0"></div>

      <div class="space-y-5">
        <div
          v-for="(event, index) in timelineEvents"
          :key="index"
          class="group relative rounded-[20px] border border-luxury-gold/10 bg-white/[0.015] p-4 shadow-[0_8px_18px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:border-luxury-gold/25"
        >
          <span class="absolute -left-[1.6rem] top-5 h-3.5 w-3.5 rounded-full border-2 border-luxury-dark bg-luxury-gold shadow-[0_0_12px_rgba(212,175,55,0.7)]"></span>

          <div class="space-y-1.5">
            <div class="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-luxury-gold/90">
              <span>{{ event.time }}</span>
              <span class="text-[10px] opacity-50">{{ event.icon }}</span>
            </div>

            <h4 class="text-base font-serif font-semibold tracking-wide text-white">
              {{ event.title }}
            </h4>

            <p class="text-[13px] leading-relaxed tracking-[0.04em] text-gray-400 font-sans">
              {{ event.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>