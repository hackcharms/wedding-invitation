<script setup lang="ts">
import { ref, onMounted } from 'vue'
import confetti from 'canvas-confetti'
import { useScratchCanvas } from '@/composables/useScratchCanvas'
import Labels from '@/config/labels.json'
import { formatWeddingDate } from '@/utils/weddingDate'

const canvasRef = ref<HTMLCanvasElement | null>(null)
const containerRef = ref<HTMLElement | null>(null)
const emit = defineEmits<{
  revealed: []
}>()

const runCelebration = () => {
  confetti({
    particleCount: 120,
    spread: 60,
    origin: { y: 0.65 },
    colors: ['#D4AF37', '#F3EAD3', '#02241C']
  })
  emit('revealed')
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
  <div class="flex max-h-full min-h-0 w-full flex-col items-center gap-4 overflow-y-auto py-4">
    <span class="shrink-0 font-sans text-sm tracking-[0.18em] uppercase text-luxury-gold/70 sm:text-lg sm:tracking-[0.3em]">Interactive Invitation Pass</span>

    <div
      ref="containerRef"
      class="scratch-card panel-glow relative w-full max-w-[360px] shrink-0 overflow-hidden rounded-[26px] border border-luxury-gold/25 bg-[linear-gradient(180deg,rgba(15,26,23,0.98),rgba(8,18,16,0.95))] p-[1px] shadow-[0_18px_38px_rgba(0,0,0,0.28)]"
    >
      <div class="scratch-card-inner relative flex min-h-[270px] w-full flex-col items-center justify-center rounded-[25px] border border-luxury-gold/12 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.08),transparent_48%)] p-4 text-center sm:p-6">
        <div class="scratch-card-glow absolute inset-0 pointer-events-none"></div>

        <div class="z-10 min-w-0 w-full select-none space-y-3 break-words">
          <span class="scratch-card-badge inline-flex items-center rounded-full border border-luxury-gold/25 bg-luxury-dark/35 px-3 py-1 font-sans text-[10px] tracking-[0.28em] uppercase text-luxury-gold">You’re Invited</span>
          <h4 class="pt-2 font-serif text-xl font-light tracking-[0.08em] text-luxury-cream sm:text-2xl">{{ formatWeddingDate('longDate') }}</h4>
          <p class="font-mono text-base tracking-[0.25em] text-luxury-gold">{{ formatWeddingDate('time') }}</p>
          <div class="mx-auto my-1 h-px w-12 bg-gradient-to-r from-transparent via-luxury-gold to-transparent"></div>
          <p class="text-sm font-sans uppercase tracking-[0.1em] text-gray-400 sm:text-base sm:tracking-[0.14em]">{{ Labels.venueName }}</p>
          <p class="text-xs font-sans uppercase tracking-[0.1em] text-gray-500 sm:tracking-[0.24em]">{{ Labels.venueAddress }}</p>
        </div>
      </div>

      <canvas
        ref="canvasRef"
        class="absolute inset-0 z-20 h-full w-full cursor-pointer touch-none transition-opacity duration-700 ease-in-out"
        :class="{ 'opacity-0 pointer-events-none': isFullyRevealed }"
        @pointerdown.prevent.stop="startScratching($event, canvasRef!)"
        @pointermove.prevent.stop="scratch($event, canvasRef!)"
        @pointerup.prevent.stop="stopScratching"
        @pointerleave.prevent.stop="stopScratching"
        @pointercancel.prevent.stop="stopScratching"
      ></canvas>
    </div>

    <div class="shrink-0 text-xs font-sans uppercase tracking-[0.14em] text-gray-500 sm:text-sm sm:tracking-[0.22em]">
      Scratch to reveal details • <span class="text-luxury-gold font-medium">{{ scratchPercentage }}%</span>
    </div>
  </div>
</template>