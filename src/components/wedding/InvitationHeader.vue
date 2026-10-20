<script setup lang="ts">
import Lantern from '@/components/ui/Lantern.vue'
import Bismillah from '@/components/ui/Bismillah.vue'
import BackgroundPattern from '../ui/BackgroundPattern.vue'
import Labels from '@/config/labels.json'
</script>

<template>
  <header class="w-full h-full max-h-full min-h-0 mx-auto overflow-y-auto relative text-center flex flex-col items-center justify-start">
    <div class="invitation-header-ornament relative flex h-32 w-full shrink-0 items-start justify-between">
      <div class="pointer-events-none absolute inset-0 opacity-[0.03] ethnic-grid-mask"></div>
      <Lantern class="w-14 h-36 text-luxury-cream/90" />
      <div class="pointer-events-none w-56 select-none opacity-90 sm:w-64">
        <BackgroundPattern />
      </div>
      <Lantern class="w-14 h-36 text-luxury-cream/90" />
    </div>

    <div class="relative z-10 mt-0 grow shrink-0 flex w-full flex-col items-center justify-center gap-3 px-3 py-3 sm:px-6">
      <div class="flex items-center justify-center text-luxury-gold select-none">
        <Bismillah class="mx-auto h-auto w-56 sm:w-64" />
      </div>

      <p class="px-2 font-sans text-[9px] font-medium uppercase tracking-[0.28em] leading-relaxed text-luxury-cream/85 sm:text-[10px]">
        With the blessings of Allah,<br>
        we request the honour of your presence<br>
        at the nikah ceremony of
      </p>

      <div class="panel-glow w-full rounded-[28px] border border-luxury-gold/20 bg-white/[0.02] px-4 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.2)] backdrop-blur-[1px] sm:px-6 lg:px-8">
        <div class="couple-names flex flex-col gap-3 font-lavishly">
          <div class="space-y-1">
            <h1 class="bg-gradient-to-b from-white via-luxury-cream to-luxury-gold bg-clip-text text-5xl leading-none tracking-normal text-transparent drop-shadow-[0_0_12px_rgba(212,175,55,0.18)] sm:text-6xl lg:text-7xl">
              {{ Labels.groom }}
            </h1>
            <p class="break-words font-sans text-xs leading-snug text-luxury-cream/85 sm:text-sm">
              <span class="block text-[9px] uppercase tracking-[0.18em] text-luxury-gold/80">Son of</span>
              {{ Labels.groomParents.father }} &amp; {{ Labels.groomParents.mother }}
            </p>
          </div>

          <div class="flex items-center justify-center gap-3">
            <div class="h-[0.5px] w-10 bg-gradient-to-r from-transparent to-luxury-gold/40 sm:w-12"></div>
            <p class="font-normal italic text-base leading-none text-luxury-gold/80 sm:text-lg">&amp;</p>
            <div class="h-[0.5px] w-10 bg-gradient-to-l from-transparent to-luxury-gold/40 sm:w-12"></div>
          </div>

          <div class="space-y-1">
            <h1 class="bg-gradient-to-b from-white via-luxury-cream to-luxury-gold bg-clip-text text-5xl leading-none tracking-normal text-transparent drop-shadow-[0_0_12px_rgba(212,175,55,0.18)] sm:text-6xl lg:text-7xl">
              {{ Labels.bride }}
            </h1>
            <p class="break-words font-sans text-xs leading-snug text-luxury-cream/85 sm:text-sm">
              <span class="block text-[9px] uppercase tracking-[0.18em] text-luxury-gold/80">Daughter of</span>
              {{ Labels.brideParents.father }} &amp; {{ Labels.brideParents.mother }}
            </p>
          </div>
        </div>
      </div>

      <p class="font-sans text-[10px] uppercase tracking-[0.24em] text-gray-400">
        Together with their families
      </p>
    </div>
  </header>
</template>

<style scoped>
.couple-names h1 {
  text-box: trim-start cap alphabetic;
}

.couple-names p {
  text-box: trim-both cap alphabetic;
}

.ethnic-grid-mask {
  background-image: radial-gradient(circle at 50% 50%, #d4af37 1px, transparent 1px);
  background-size: 12px 12px;
}

@media (max-height: 500px) {
  .invitation-header-ornament {
    height: 6rem;
  }
}
</style>