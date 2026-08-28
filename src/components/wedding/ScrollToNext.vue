<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const canScroll = ref(true)
const isFirstPanel = ref(true)

const handleScroll = () => {
  // Check if first panel is visible
  const firstPanel = document.querySelector('.intro-panel')
  if (!firstPanel) return

  const rect = firstPanel.getBoundingClientRect()
  // Show button only if first panel is in viewport
  isFirstPanel.value = rect.top < window.innerHeight * 0.8 && rect.bottom > window.innerHeight * 0.2
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll() // Initial check
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const scrollToNext = () => {
  if (!canScroll.value) return

  canScroll.value = false
  
  // Get viewport height to scroll by
  const scrollDistance = window.innerHeight * 1
  
  // Smooth scroll down
  window.scrollBy({
    top: scrollDistance,
    behavior: 'smooth'
  })

  // Prevent rapid clicking
  setTimeout(() => {
    canScroll.value = true
  }, 800)
}
</script>

<template>
  <div v-show="isFirstPanel" class="fixed bottom-6 left-6 z-50 transition-opacity duration-300">
    <button 
      @click="scrollToNext"
      class="w-10 h-10 rounded-full bg-luxury-card/80 backdrop-blur-md border border-luxury-gold/40 flex items-center justify-center shadow-premium transition-all duration-500 hover:scale-110 active:scale-95 group"
    >
      <!-- Down arrow icon -->
      <span class="text-luxury-gold text-lg select-none">
        ↓
      </span>
      
      <!-- Tiny floating help bubble on hover -->
      <span class="absolute left-12 bg-luxury-dark/90 text-luxury-gold text-[9px] uppercase tracking-widest px-2 py-1 rounded border border-luxury-gold/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap hidden sm:inline-block">
        Scroll Next
      </span>
    </button>
  </div>
</template>
