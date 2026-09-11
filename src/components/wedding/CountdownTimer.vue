<script setup lang="ts">
import type { TimeRemaining } from '@/types/wedding'

defineProps<{
  timeData: TimeRemaining
}>()
</script>

<template>
  <section class="mx-auto w-full max-w-xs space-y-4 text-center">
    <h4 class="font-sans text-lg tracking-[0.25em] uppercase text-luxury-gold">Counting Down to Forever</h4>

    <div v-if="!timeData.isExpired" class="grid grid-cols-4 gap-2">
      <div
        v-for="(value, unit) in { Days: timeData.days, Hours: timeData.hours, Mins: timeData.minutes, Secs: timeData.seconds }"
        :key="unit"
        class="rounded-[18px] border border-luxury-gold/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.01))] p-3 shadow-[0_8px_18px_rgba(0,0,0,0.15)]"
      >
        <span
          class="block font-mono text-2xl font-light text-white"
          :class="{ 'animate-pulse text-luxury-gold': unit === 'Secs' }"
        >{{ value }}</span>
        <span class="mt-1 block text-[9px] uppercase tracking-[0.26em] text-gray-500 font-sans">{{ unit }}</span>
      </div>
    </div>

    <div v-else class="text-lg font-sans uppercase tracking-[0.22em] text-luxury-cream animate-pulse">
      The Celebration Has Begun ✨
    </div>
  </section>
</template>