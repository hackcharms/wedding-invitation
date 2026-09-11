<script setup>
import { ref } from 'vue'
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

  tl.to('.lock-badge', {
      scale: 0.7,
      rotation: 180,
      opacity: 0,
      filter: 'blur(2px)',
      duration: 0.7,
    })
    .to('.shutter-l', { xPercent: -105, duration: 1.7, ease: 'power3.inOut' }, 0.15)
    .to('.shutter-r', { xPercent: 105, duration: 1.7, ease: 'power3.inOut' }, 0.15)
    .to('.center-glow', { opacity: 0, scale: 1.5, duration: 1 }, 0.35)
    .to('.gate-viewport', { autoAlpha: 0, duration: 0.8 }, 1.1)

  gsap.fromTo(
    '.invitation-shell',
    { autoAlpha: 0, y: 24, scale: 0.98 },
    { autoAlpha: 1, y: 0, scale: 1, duration: 1.1, ease: 'power3.out', delay: 0.6 }
  )
}
</script>

<template>
  <div v-if="isClosed" class="gate-viewport fixed inset-0 z-50 flex overflow-hidden bg-[#050b09]">
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08),transparent_45%)]"></div>

    <div class="shutter-l relative w-1/2 h-full border-r border-luxury-gold/30 bg-[linear-gradient(90deg,rgba(7,11,10,1)_0%,rgba(13,22,19,1)_32%,rgba(8,19,15,1)_100%)] shadow-[0_0_40px_rgba(212,175,55,0.08)] overflow-hidden">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(212,175,55,0.14),transparent_35%)]"></div>
      <div class="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-luxury-gold/70 to-transparent"></div>
      <div class="absolute inset-0 shimmer opacity-60"></div>
    </div>

    <div class="center-glow absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border border-luxury-gold/60 bg-[radial-gradient(circle,rgba(212,175,55,0.34),rgba(212,175,55,0.1)_30%,transparent_72%)] shadow-[0_0_40px_rgba(212,175,55,0.25)]"></div>

    <div class="shutter-r relative w-1/2 h-full border-l border-luxury-gold/30 bg-[linear-gradient(270deg,rgba(7,11,10,1)_0%,rgba(13,22,19,1)_32%,rgba(8,19,15,1)_100%)] shadow-[0_0_40px_rgba(212,175,55,0.08)] overflow-hidden">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(212,175,55,0.14),transparent_35%)]"></div>
      <div class="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-luxury-gold/70 to-transparent"></div>
      <div class="absolute inset-0 shimmer opacity-60"></div>
    </div>

    <div class="lock-badge absolute left-1/2 top-1/2 z-40 -translate-x-1/2 -translate-y-1/2">
      <button
        @click="triggerGateReveal"
        class="group relative flex h-28 w-28 items-center justify-center rounded-full border border-luxury-gold/80 bg-[radial-gradient(circle_at_50%_35%,rgba(12,49,44,0.96),rgba(4,17,13,1)_65%)] text-luxury-champagne shadow-[0_0_45px_rgba(212,175,55,0.35)] transition-all duration-500 hover:scale-105 active:scale-95 focus:outline-none"
      >
        <span class="absolute inset-[10px] rounded-full border border-luxury-gold/40"></span>
        <span class="absolute inset-0 rounded-full animate-[pulse_2.8s_ease-in-out_infinite] bg-luxury-gold/10"></span>
        <span class="absolute -top-4 text-2xl drop-shadow-[0_0_12px_rgba(212,175,55,0.9)]">✦</span>
        <span class="relative flex flex-col items-center leading-none">
          <span class="mb-1 text-[10px] tracking-[0.4em] uppercase text-luxury-gold/80">Open</span>
          <span class="text-xl font-light tracking-[0.18em] uppercase">Love</span>
        </span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.shimmer {
  background: linear-gradient(
    115deg,
    transparent 0%,
    rgba(255, 255, 255, 0.08) 18%,
    rgba(212, 175, 55, 0.15) 35%,
    rgba(255, 255, 255, 0.06) 52%,
    transparent 70%
  );
  transform: translateX(-100%);
  animation: shimmerSweep 5.5s ease-in-out infinite;
}

@keyframes shimmerSweep {
  0% {
    transform: translateX(-140%) skewX(-18deg);
    opacity: 0;
  }
  20% {
    opacity: 0.8;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translateX(140%) skewX(-18deg);
    opacity: 0;
  }
}
</style>