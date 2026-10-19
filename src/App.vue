<script setup lang="ts">
import InvitationLanding from '@/views/InvitationLandingScroll.vue'
import ThemeToggle from '@/components/ui/ThemeToggle.vue'
import { ref } from 'vue'
import PetalAnimation from '@/components/backgrounds/PetalAnimation.vue'

const animation = ref<InstanceType<typeof PetalAnimation> | null>(null)

</script>

<template>
  <div class="min-h-dvh w-full bg-luxury-dark text-luxury-cream antialiased selection:bg-luxury-gold/30 petal-preview">
    <ThemeToggle />
    <InvitationLanding/>
    <button @click="animation?.pause()">Pause</button>
    <button @click="animation?.play()">Play</button>
    <button @click="animation?.restart()">Restart</button>
    <PetalAnimation
      ref="animation"
      overlay
      :petal-count="80"
    />

  </div>
</template>

<style>
html, body {
  background-color: var(--color-luxury-dark);
  margin: 0;
  padding: 0;
}
.petal-preview {
  min-height: 100svh;
  background: linear-gradient(145deg, #fffdf7 0%, #f1f5ef 50%, #e3ede7 100%);
}
</style>