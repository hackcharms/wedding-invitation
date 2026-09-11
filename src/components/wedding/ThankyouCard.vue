<script setup lang="ts">
import Labels from '@/config/labels.json'
</script>

<template>
  <section class="mx-auto w-full px-3 pb-10 pt-4">
    <div class="px-5 py-7 text-center">
      <p class="text-xl font-sans tracking-[0.35em] uppercase text-luxury-gold/85">
        {{ Labels.closing.eyebrow }}
      </p>

      <div class="mx-auto mt-4 h-px w-14 bg-gradient-to-r from-transparent via-luxury-gold to-transparent"></div>

      <div class="mt-5 space-y-3 text-lg leading-7 text-gray-200 font-sans">
        <p v-for="(paragraph, index) in Labels.closing.paragraphs" :key="index">
          {{ paragraph }}
        </p>
      </div>

      <p class="mt-6 text-xl font-serif text-luxury-gold">{{ Labels.closing.blessing }}</p>

      <div class="mt-5 font-parisienne text-[2.4rem] leading-none text-luxury-cream/95 tracking-[0.04em]">
        {{ Labels.groom }} &amp; {{ Labels.bride }}
      </div>
    </div>
  </section>
</template>
