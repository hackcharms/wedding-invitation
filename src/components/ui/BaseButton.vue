<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'outline'
  type?: 'button' | 'submit'
  disabled?: boolean
}

withDefaults(defineProps<Props>(), {
  variant: 'primary',
  type: 'button',
  disabled: false
})
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    class="w-full py-2.5 px-4 font-sans text-xs font-semibold tracking-widest uppercase rounded transition-all duration-300 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
    :class="{
      'bg-theme-gold text-theme-emerald hover:bg-theme-gold-light hover:text-black shadow-luxury-glow': variant === 'primary',
      'bg-theme-emerald-light text-theme-gold-light hover:bg-theme-emerald border border-theme-gold/20': variant === 'secondary',
      'border border-theme-gold/40 text-theme-gold hover:bg-theme-gold hover:text-theme-emerald': variant === 'outline'
    }"
  >
    <slot />
  </button>
</template>