<script setup lang="ts">
defineProps<{
  src: string
  tone?: 'gold' | 'cream' | 'sage'
}>()
</script>

<template>
  <span
    class="flower-accent"
    :class="`flower-accent--${tone ?? 'gold'}`"
    :style="{ '--flower-image': `url('${src}')` }"
    aria-hidden="true"
  ></span>
</template>

<style scoped>
.flower-accent {
  display: block;
  background: var(--flower-color);
  -webkit-mask-image: var(--flower-image);
  mask-image: var(--flower-image);
  -webkit-mask-position: center;
  mask-position: center;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: contain;
  mask-size: contain;
}

.flower-accent--gold {
  --flower-color: linear-gradient(145deg, #e7c75a, var(--color-luxury-gold) 52%, var(--color-luxury-bronze));
}

.flower-accent--cream {
  --flower-color: var(--color-luxury-cream);
}

.flower-accent--sage {
  --flower-color: linear-gradient(145deg, #bdcaa9, #81916f);
}

:global(html[data-theme='light']) .flower-accent--sage {
  --flower-color: linear-gradient(145deg, #a6b89d, #718773);
}
</style>