<script setup lang="ts">
import type { TimeRemaining } from '@/types/wedding'

defineProps<{
  timeData: TimeRemaining
}>()
</script>

<template>
  <section class="text-center space-y-4 max-w-xs mx-auto w-full">
    <h4 class="font-sans text-lg tracking-[0.25em] uppercase text-luxury-gold">Counting Down to Forever</h4>
    
    <div v-if="!timeData.isExpired" class="grid grid-cols-4 gap-2">
      <div v-for="(value, unit) in { Days: timeData.days, Hours: timeData.hours, Mins: timeData.minutes, Secs: timeData.seconds }" :key="unit" class="bg-luxury-obsidian p-3 rounded-lg border border-white/[0.03]">
        <span class="block text-2xl font-light font-mono text-white" :class="{ 'text-luxury-gold animate-pulse': unit === 'Secs' }">{{ value }}</span>
        <span class="text-[9px] uppercase tracking-wider text-gray-500 font-sans">{{ unit }}</span>
      </div>
    </div>
    
    <div v-else class="text-lg font-sans tracking-widest text-luxury-cream uppercase animate-pulse">
      The Celebration Has Begun ✨
    </div>
  </section>
</template>