<script setup lang="ts">
import { ref, onMounted } from 'vue'
import confetti from 'canvas-confetti'
import { useScratchCanvas } from '@/composables/useScratchCanvas'

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
    <span class="font-sans text-[10px] tracking-[0.3em] uppercase text-luxury-gold/70">Interactive Invitation Pass</span>

    <div 
      ref="containerRef"
      class="relative w-full max-w-[340px] aspect-[4/3] bg-luxury-card rounded-lg overflow-hidden shadow-premium p-1"
    >
      <div class="w-full h-full border border-luxury-gold/20 rounded-md p-6 flex flex-col justify-center items-center relative">
        
        <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-luxury-emerald/20 via-transparent to-transparent pointer-events-none"></div>

        <div class="text-center space-y-2 z-10 select-none">
          <span class="font-sans text-[9px] tracking-[0.25em] text-luxury-gold uppercase px-3 py-0.5 border border-luxury-gold/30 rounded-full bg-luxury-dark/40">You're Invited</span>
          <h4 class="text-2xl font-serif font-light text-luxury-cream tracking-wide pt-2">Saturday, Aug 21</h4>
          <p class="font-mono text-xs text-luxury-gold tracking-widest">12:30 PM</p>
          <div class="w-12 h-[1px] bg-luxury-gold/20 mx-auto my-1"></div>
          <p class="text-[11px] font-sans text-gray-400 tracking-wide uppercase">Grand Palace Hall, Mumbai</p>
        </div>
      </div>

      <canvas 
        ref="canvasRef"
        class="absolute inset-0 w-full h-full cursor-crosshair transition-opacity duration-700 ease-in-out touch-none z-20"
        :class="{ 'opacity-0 pointer-events-none': isFullyRevealed }"
        @pointerdown="startScratching($event, canvasRef!)"
        @pointermove="scratch($event, canvasRef!)"
        @pointerup="stopScratching"
        @pointerleave="stopScratching"
      ></canvas>
    </div>

    <div class="text-[10px] font-sans text-gray-500 tracking-widest uppercase">
      Scratch to reveal details • <span class="text-luxury-gold font-medium">{{ scratchPercentage }}%</span>
    </div>
  </div>
</template>