<script setup>
import { ref, onMounted } from 'vue'
import confetti from 'canvas-confetti'
import { useScratchCanvas } from '@/composables/useScratchCanvas'

const canvasRef = ref(null)
const containerRef = ref(null)

const triggerConfettiSuccess = () => {
  confetti({
    particleCount: 140,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#D4AF37', '#FFFDD0', '#021E17', '#FFFFFF']
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
  thresholdPercent: 45,
  onThresholdReached: triggerConfettiSuccess
})

onMounted(() => {
  if (canvasRef.value && containerRef.value) {
    initCanvas(canvasRef.value, containerRef.value)
  }
})
</script>

<template>
  <div class="flex flex-col items-center space-y-4 w-full">
    <span class="font-sans text-[11px] tracking-[0.2em] uppercase text-gray-400">The Golden Invitation Pass</span>
    
    <div 
      ref="containerRef" 
      class="relative w-full max-w-sm aspect-[4/3] bg-luxury-obsidian rounded-xl border border-luxury-gold/30 overflow-hidden shadow-[0_20px_45px_rgba(0,0,0,0.6)] flex flex-col justify-center items-center text-center p-6"
    >
      <div class="space-y-2 select-none pointer-events-none">
        <span class="font-sans text-[9px] tracking-widest text-luxury-gold uppercase px-3 py-0.5 border border-luxury-gold/20 rounded-full">Save The Date</span>
        <h3 class="text-2xl font-serif font-normal text-white pt-2">Saturday, August 21, 2027</h3>
        <div class="w-16 h-[1px] bg-luxury-gold/30 mx-auto my-2"></div>
        <p class="text-xs text-gray-300">Nikah: 4:00 PM | Walima to Follow</p>
        <p class="text-[10px] font-sans text-gray-500 tracking-wider uppercase pt-1">Grand Ballroom, The Taj Palace</p>
      </div>

      <canvas 
        ref="canvasRef" 
        class="absolute inset-0 w-full h-full cursor-pointer transition-opacity duration-700 ease-in-out touch-none"
        :class="{ 'opacity-0 pointer-events-none': isFullyRevealed }"
        @pointerdown="startScratching($event, canvasRef)"
        @pointermove="scratch($event, canvasRef)"
        @pointerup="stopScratching"
        @pointerleave="stopScratching"
      ></canvas>
    </div>
    
    <p class="text-[10px] font-sans text-gray-500 tracking-wider">
      Foil Scraped: <span class="text-luxury-gold font-semibold">{{ scratchPercentage }}%</span> / 45%
    </p>
  </div>
</template>