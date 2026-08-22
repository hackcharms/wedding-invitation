<script setup lang="ts">
import Lantern from './Lantern.vue';
// Reusable inline SVG vectors for ethnic decoration
defineProps<{
  type: 'mandala' | 'lantern' | 'arch'
}>()
</script>

<template>
  <!-- TOP MANDALA DECORATION -->
  <svg v-if="type === 'mandala'" viewBox="0 0 200 100" class="w-full" fill="currentColor">
    <circle cx="100" cy="0" r="80" fill="none" stroke="currentColor" stroke-width="0.5" stroke-dasharray="2,2" />
    <circle cx="100" cy="0" r="65" fill="none" stroke="currentColor" stroke-width="0.75" />
    <circle cx="100" cy="0" r="50" fill="none" stroke="currentColor" stroke-width="0.5" />
    <!-- Mandala Petals -->
    <path v-for="i in 24" :key="i" d="M 100 0 C 90 40, 110 40, 100 0" 
          :transform="`rotate(${(i - 12) * 7.5} 100 0)`" fill="none" stroke="currentColor" stroke-width="0.75" />
    <path v-for="i in 18" :key="'inner'+i" d="M 100 0 C 94 25, 106 25, 100 0" 
          :transform="`rotate(${(i - 9) * 10} 100 0)`" fill="none" stroke="currentColor" stroke-width="0.5" />
    <circle cx="100" cy="0" r="12" fill="none" stroke="currentColor" stroke-width="1" />
  </svg>

  <!-- SUSPENDED LANTERN -->
  <div v-else-if="type === 'lantern'" class="w-full relative" >
    <Lantern class="w-12 h-24" />
  </div>

  <!-- TRADITIONAL ARCH CORNER -->
  <svg v-else-if="type === 'arch'" viewBox="0 0 100 30" class="w-full" fill="none" stroke="currentColor" stroke-width="0.75">
    <path d="M 0 30 C 20 30, 35 25, 50 12 C 65 25, 80 30, 100 30 C 85 26, 70 20, 50 0 C 30 20, 15 26, 0 30 Z" fill="currentColor" fill-opacity="0.05"/>
  </svg>
</template>