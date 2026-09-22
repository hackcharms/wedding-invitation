<script setup lang="ts">
import InvitationLanding from '@/views/InvitationLandingScroll.vue'
import ThemeToggle from '@/components/ui/ThemeToggle.vue'

</script>

<template>
  <div class="min-h-dvh w-full bg-luxury-dark text-luxury-cream antialiased selection:bg-luxury-gold/30">
    <ThemeToggle />
    <InvitationLanding/>
  </div>
</template>

<style>
html, body {
  background-color: var(--color-luxury-dark);
  margin: 0;
  padding: 0;
}
</style>