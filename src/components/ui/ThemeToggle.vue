<script setup lang="ts">
import { useTheme } from '@/composables/useTheme'

const { isDark, toggleTheme } = useTheme()
</script>

<template>
  <button
    type="button"
    class="theme-toggle fixed right-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-luxury-gold/40 bg-luxury-card/85 text-luxury-gold shadow-premium backdrop-blur-md transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-luxury-gold/60"
    :aria-label="isDark ? 'Switch to light theme' : 'Switch to dark theme'"
    :title="isDark ? 'Switch to light theme' : 'Switch to dark theme'"
    @click="toggleTheme"
  >
    <svg v-if="isDark" aria-hidden="true" viewBox="0 0 24 24" class="h-4 w-4 fill-none stroke-current stroke-2">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
    <svg v-else aria-hidden="true" viewBox="0 0 24 24" class="h-4 w-4 fill-none stroke-current stroke-2">
      <path d="M21 12.8A8.5 8.5 0 1 1 11.2 3 6.6 6.6 0 0 0 21 12.8Z" />
    </svg>
  </button>
</template>
