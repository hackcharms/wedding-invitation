<script setup lang="ts">
import InvitationLanding from '@/views/InvitationLanding.vue'
import InvitationLandingScroll from '@/views/InvitationLandingScroll.vue'

const isBasicVariant = new URLSearchParams(window.location.search).get('variant') === 'basic'
</script>

<template>
  <div class="w-full min-h-dvh bg-theme-obsidian text-gray-200 antialiased selection:bg-theme-gold/30">
    <InvitationLanding v-if="isBasicVariant" />
    <InvitationLandingScroll v-else/>
  </div>
</template>

<style>
/* Reset base document container directly */
html, body {
  background-color: #01140F; /* Fallback matching bg-theme-obsidian */
  margin: 0;
  padding: 0;
}
</style>