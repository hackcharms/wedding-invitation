<script setup lang="ts">
import Lantern from '@/components/ui/Lantern.vue'
import Bismillah from '@/components/ui/Bismillah.vue'
import BackgroundPattern from '../ui/BackgroundPattern.vue'
import Labels from '@/config/labels.json'
</script>

<template>
  <header class="w-full h-full mx-auto overflow-hidden relative text-center flex flex-col items-center justify-center">
    <div class="relative flex h-32 w-full items-start justify-between">
      <div class="pointer-events-none absolute inset-0 opacity-[0.03] ethnic-grid-mask"></div>
      <Lantern class="w-14 h-36 text-luxury-cream/90" />
      <div class="pointer-events-none w-56 select-none opacity-90 sm:w-64">
        <BackgroundPattern />
      </div>
      <Lantern class="w-14 h-36 text-luxury-cream/90" />
    </div>

    <div class="relative z-10 mt-0 grow  flex w-full flex-col items-center justify-center gap-5 px-3 sm:px-6">
      <div class="flex items-center justify-center text-luxury-gold select-none">
        <Bismillah class="mx-auto h-auto w-56 sm:w-64" />
      </div>

      <p class="px-2 font-sans text-[9px] font-medium uppercase tracking-[0.28em] leading-relaxed text-luxury-cream/85 sm:text-[10px]">
        With the blessings of Allah,<br>
        we request the honour of your presence<br>
        at the nikah ceremony of
      </p>

      <div class="w-full rounded-[28px] border border-luxury-gold/20 bg-white/[0.02] px-4 py-5 shadow-[0_10px_30px_rgba(0,0,0,0.2)] backdrop-blur-[1px] sm:px-6 lg:px-8">
        <div class="space-y-2 font-parisienne font-bold">
          <h1 class="bg-gradient-to-b from-white via-luxury-cream to-luxury-gold bg-clip-text text-4xl tracking-[0.08em] text-transparent drop-shadow-[0_0_12px_rgba(212,175,55,0.18)] sm:text-5xl lg:text-6xl">
            {{ Labels.groom }}
          </h1>

          <div class="my-1 flex items-center justify-center gap-3">
            <div class="h-[0.5px] w-10 bg-gradient-to-r from-transparent to-luxury-gold/40 sm:w-12"></div>
            <p class="font-normal italic text-base text-luxury-gold/80 sm:text-lg">&amp;</p>
            <div class="h-[0.5px] w-10 bg-gradient-to-l from-transparent to-luxury-gold/40 sm:w-12"></div>
          </div>

          <h1 class="bg-gradient-to-b from-white via-luxury-cream to-luxury-gold bg-clip-text text-4xl tracking-[0.08em] text-transparent drop-shadow-[0_0_12px_rgba(212,175,55,0.18)] sm:text-5xl lg:text-6xl">
            {{ Labels.bride }}
          </h1>
        </div>
      </div>

      <p class="font-sans text-[10px] uppercase tracking-[0.24em] text-gray-400">
        Together with their families
      </p>
    </div>
  </header>
</template>

<style scoped>
.ethnic-grid-mask {
  background-image: radial-gradient(circle at 50% 50%, #d4af37 1px, transparent 1px);
  background-size: 12px 12px;
}
</style>