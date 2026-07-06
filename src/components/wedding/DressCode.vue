<script setup lang="ts">
import { ref } from 'vue'

const colors = ref([
  { hex: '#02241C', name: 'Emerald' },
  { hex: '#D4AF37', name: 'Gold' },
  { hex: '#F3EAD3', name: 'Cream' },
  { hex: '#1E293B', name: 'Midnight' }
])
</script>

<template>
  <div class="max-w-xs mx-auto w-full p-5 bg-luxury-card/30 border border-luxury-gold/10 rounded-xl space-y-4 text-center">
    <div class="space-y-1">
      <span class="text-xs text-luxury-gold">👗</span>
      <h4 class="font-serif text-xs tracking-[0.2em] uppercase text-white">Dress Code &amp; Palette</h4>
      <p class="text-[10px] text-gray-400 font-sans">We invite you to celebrate with us in traditional formal attire matching our color story.</p>
    </div>

    <!-- Palette Swatches Matrix -->
    <div class="flex items-center justify-center gap-4 pt-1">
      <div v-for="color in colors" :key="color.hex" class="flex flex-col items-center space-y-1 group">
        <div 
          class="w-8 h-8 rounded-full border border-white/20 shadow-inner transition-transform group-hover:scale-110 duration-300"
          :style="{ backgroundColor: color.hex }"
        ></div>
        <span class="text-[8px] font-sans tracking-wider text-gray-500 uppercase">{{ color.name }}</span>
      </div>
    </div>
  </div>
</template>