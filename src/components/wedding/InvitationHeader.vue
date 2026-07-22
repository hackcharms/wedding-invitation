<script setup lang="ts">
import EthnicOrnaments from '@/components/ui/EthnicOrnaments.vue'
import Bismillah from '@/components/ui/Bismillah.vue'
import BackgroundPattern from '../ui/BackgroundPattern.vue';
import Labels from '@/config/labels.json'
</script>

<template>
  <header class="w-full max-w-sm mx-auto rounded-2xl overflow-hidden bg-gradient-to-b from-[#02241C] via-[#011a14] to-luxury-dark border border-luxury-gold/30 shadow-2xl relative px-6 pt-24 pb-20 text-center">
    
    <!-- Procedural micro-patterning background -->
    <div class="absolute inset-0 opacity-[0.02] pointer-events-none ethnic-grid-mask"></div>

    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-46 text-luxury-gold/25 pointer-events-none select-none">
       <BackgroundPattern/>
    </div>

    <!-- LANTERNS (Changed text-white to text-luxury-gold/40) -->
    <div class="absolute top-0 left-6 w-6 text-luxury-gold/40 pointer-events-none select-none">
      <EthnicOrnaments type="lantern" />
    </div>
    <div class="absolute top-0 right-6 w-6 text-luxury-gold/40 pointer-events-none select-none">
      <EthnicOrnaments type="lantern" />
    </div>

    <!-- CENTRAL CONTENT -->
    <div class="relative z-10 space-y-6 mt-4">
      <!-- Bismillah (Ensured warm tint) -->
      <div class="flex justify-center items-center text-luxury-gold select-none mt-4">
          <Bismillah class="w-24 h-auto mx-auto" />
      </div>

      <!-- Invitation text with clean hierarchy -->
      <p class="font-sans text-[9px] sm:text-[10px] tracking-[0.25em] leading-relaxed uppercase text-luxury-cream/90 font-medium px-2">
        With the blessings of Allah,<br>
        we request the honour of your presence<br>
        at the nikah ceremony of
      </p>

      <!-- FIXED NAMES (High contrast, crisp text, no dark overlay) -->
      <div class="py-4 space-y-2 font-parisienne font-bold">
        <h1 class="text-4xl tracking-wide text-transparent bg-clip-text bg-gradient-to-b from-white via-luxury-cream to-luxury-gold drop-shadow-sm">
          {{ Labels.groom }}
        </h1>
        
        <div class="flex items-center justify-center gap-3 my-1">
          <div class="h-[0.5px] w-10 bg-gradient-to-r from-transparent to-luxury-gold/40"></div>
          <p class="font-normal italic text-luxury-gold/80 text-base">&amp;</p>
          <div class="h-[0.5px] w-10 bg-gradient-to-l from-transparent to-luxury-gold/40"></div>
        </div>
        
        <h1 class="text-4xl tracking-wide text-transparent bg-clip-text bg-gradient-to-b from-white via-luxury-cream to-luxury-gold drop-shadow-sm">
          {{ Labels.bride }}
        </h1>
      </div>

      <p class="font-sans text-[10px] tracking-[0.2em] uppercase text-gray-400">
        Together with their families
      </p>
    </div>

  </header>
</template>

<style scoped>
.ethnic-grid-mask {
  background-image: 
    radial-gradient(circle at 50% 50%, #D4AF37 1px, transparent 1px);
  background-size: 12px 12px;
}
</style>