<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'

const emit = defineEmits(['unlocked'])
const isClosed = ref(true)

const triggerGateReveal = () => {
  const tl = gsap.timeline({
    defaults: { ease: 'power4.inOut', duration: 1.8 },
    onComplete: () => {
      isClosed.value = false
      emit('unlocked')
    }
  })

  tl.to('.lock-badge', { scale: 0, rotation: 180, opacity: 0, duration: 0.6 })
    .to('.shutter-l', { xPercent: -100 }, 0.4)
    .to('.shutter-r', { xPercent: 100 }, 0.4)
    .to('.gate-viewport', { autoAlpha: 0, duration: 0.6 }, 1.2)
}
</script>

<template>
  <div v-if="isClosed" class="gate-viewport fixed inset-0 z-50 flex overflow-hidden">
    <div class="shutter-l w-1/2 h-full bg-luxury-obsidian border-r border-luxury-gold/20 flex items-center justify-end relative shadow-2xl">
      <div class="lock-badge absolute right-0 translate-x-1/2 z-50">
        <button 
          @click="triggerGateReveal"
          class="w-24 h-24 rounded-full bg-luxury-emerald border border-luxury-gold text-luxury-champagne font-sans text-[11px] tracking-[0.2em] uppercase flex flex-col items-center justify-center gap-1 shadow-[0_0_40px_rgba(212,175,55,0.25)] transition-transform hover:scale-105 active:scale-95 focus:outline-none"
        >
          <span class="text-xl animate-pulse">⚜️</span>
          <span>Open</span>
        </button>
      </div>
    </div>
    <div class="shutter-r w-1/2 h-full bg-luxury-obsidian border-l border-luxury-gold/20"></div>
  </div>
</template>