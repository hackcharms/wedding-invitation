<script setup lang="ts">
import { ref, onMounted } from 'vue'
import confetti from 'canvas-confetti'
import { useScratchCanvas } from '@/composables/useScratchCanvas'
import Labels from '@/config/labels.json'

const canvasRef = ref<HTMLCanvasElement | null>(null)
const containerRef = ref<HTMLElement | null>(null)

const runCelebration = () => {
  confetti({
    particleCount: 120,
    spread: 60,
    origin: { y: 0.65 },
    colors: ['#D4AF37', '#F3EAD3', '#02241C']
  })
}

const {
  scratchPercentage,
  isFullyRevealed,
  initCanvas,
  startScratching,
  scratch,
  stopScratching
} = useScratchCanvas({
  thresholdPercent: 40,
  onThresholdReached: runCelebration
})

onMounted(() => {
  if (canvasRef.value && containerRef.value) {
    initCanvas(canvasRef.value, containerRef.value)
  }
})
</script>

<template>
  <div class="w-full flex flex-col items-center space-y-4">
    <span class="font-sans text-lg tracking-[0.3em] uppercase text-luxury-gold/70">Interactive Invitation Pass</span>

    <div
      ref="containerRef"
      class="relative w-full max-w-[340px] aspect-[4/3] overflow-hidden rounded-[26px] border border-luxury-gold/25 bg-[linear-gradient(180deg,rgba(15,26,23,0.98),rgba(8,18,16,0.95))] p-[1px] shadow-[0_18px_38px_rgba(0,0,0,0.28)]"
    >
      <div class="relative flex h-full w-full flex-col items-center justify-center rounded-[25px] border border-luxury-gold/12 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.08),transparent_48%)] p-6 text-center">
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.04),transparent_52%)] pointer-events-none"></div>

        <div class="z-10 select-none space-y-3">
          <span class="inline-flex items-center rounded-full border border-luxury-gold/25 bg-luxury-dark/35 px-3 py-1 font-sans text-[10px] tracking-[0.28em] uppercase text-luxury-gold">You’re Invited</span>
          <h4 class="pt-2 font-serif text-2xl font-light tracking-[0.08em] text-luxury-cream">{{ Labels.scratchCard.date }}</h4>
          <p class="font-mono text-base tracking-[0.25em] text-luxury-gold">{{ Labels.scratchCard.time }}</p>
          <div class="mx-auto my-1 h-px w-12 bg-gradient-to-r from-transparent via-luxury-gold to-transparent"></div>
          <p class="text-base font-sans uppercase tracking-[0.14em] text-gray-400">{{ Labels.venueName }}</p>
          <p class="text-xs font-sans uppercase tracking-[0.24em] text-gray-500">{{ Labels.venueAddress }}</p>
        </div>
      </div>

      <canvas
        ref="canvasRef"
        class="absolute inset-0 z-20 h-full w-full cursor-pointer touch-none transition-opacity duration-700 ease-in-out"
        :class="{ 'opacity-0 pointer-events-none': isFullyRevealed }"
        @pointerdown="startScratching($event, canvasRef!)"
        @pointermove="scratch($event, canvasRef!)"
        @pointerup="stopScratching"
        @pointerleave="stopScratching"
      ></canvas>
    </div>

    <div class="text-sm font-sans uppercase tracking-[0.22em] text-gray-500">
      Scratch to reveal details • <span class="text-luxury-gold font-medium">{{ scratchPercentage }}%</span>
    </div>
  </div>
</template>