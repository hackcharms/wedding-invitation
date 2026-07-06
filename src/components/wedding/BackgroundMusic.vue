<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isPlaying = ref(false)
let audio: HTMLAudioElement | null = null

onMounted(() => {
  // Replace with your preferred instrumental or soft background track audio URL
  audio = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3')
  audio.loop = true
})

const toggleAudio = () => {
  if (!audio) return
  if (isPlaying.value) {
    audio.pause()
  } else {
    audio.play().catch(err => console.log("Audio playback waiting for user gesture:", err))
  }
  isPlaying.value = !isPlaying.value
}
</script>

<template>
  <div class="fixed bottom-6 right-6 z-50">
    <button 
      @click="toggleAudio"
      class="w-10 h-10 rounded-full bg-luxury-card/80 backdrop-blur-md border border-luxury-gold/40 flex items-center justify-center shadow-premium transition-all duration-500 hover:scale-110 active:scale-95 group"
    >
      <!-- Visual Spinning Disc State -->
      <span 
        class="text-luxury-gold text-xs font-mono select-none"
        :class="{ 'animate-spin': isPlaying }"
        style="animation-duration: 3s;"
      >
        {{ isPlaying ? '🎵' : '🔇' }}
      </span>
      
      <!-- Tiny floating help bubble on hover -->
      <span class="absolute right-12 bg-luxury-dark/90 text-luxury-gold text-[9px] uppercase tracking-widest px-2 py-1 rounded border border-luxury-gold/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap hidden sm:inline-block">
        {{ isPlaying ? 'Mute Music' : 'Play Music' }}
      </span>
    </button>
  </div>
</template>