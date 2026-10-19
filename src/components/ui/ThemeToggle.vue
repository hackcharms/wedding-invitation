<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, useId, useTemplateRef } from 'vue'
import { useTheme } from '@/composables/useTheme'
import type { ColorTheme } from '@/config/themes'

const { isDark, toggleTheme, colorTheme, themes, selectTheme } = useTheme()
const picker = useTemplateRef<HTMLElement>('picker')
const modeButton = useTemplateRef<HTMLButtonElement>('modeButton')
const paletteOptions = useTemplateRef<HTMLFieldSetElement>('paletteOptions')
const paletteId = useId()
const isPickerOpen = ref(false)
let holdTimer: ReturnType<typeof setTimeout> | undefined
let suppressClick = false
let activePointer: number | null = null
let pressX = 0
let pressY = 0

function clearHold(): void {
  clearTimeout(holdTimer)
  holdTimer = undefined
}

function closePicker(restoreFocus = false): void {
  clearHold()
  isPickerOpen.value = false
  if (restoreFocus) modeButton.value?.focus()
}

async function openPickerWithKeyboard(): Promise<void> {
  isPickerOpen.value = true
  await nextTick()
  paletteOptions.value?.querySelector<HTMLInputElement>('input:checked')?.focus()
}

function startHold(event: PointerEvent): void {
  if (!event.isPrimary || event.button !== 0) return
  clearHold()
  suppressClick = false
  activePointer = event.pointerId
  pressX = event.clientX
  pressY = event.clientY
  modeButton.value?.setPointerCapture(event.pointerId)
  holdTimer = setTimeout(() => {
    holdTimer = undefined
    suppressClick = true
    isPickerOpen.value = true
  }, 450)
}

function moveHold(event: PointerEvent): void {
  if (event.pointerId !== activePointer) return
  if (Math.hypot(event.clientX - pressX, event.clientY - pressY) > 10) {
    clearHold()
    suppressClick = true
  }
}

function finishHold(event: PointerEvent): void {
  if (event.pointerId !== activePointer) return
  clearHold()
  activePointer = null
}

function cancelHold(): void {
  if (activePointer === null) return
  clearHold()
  activePointer = null
  suppressClick = true
}

function handleModeClick(event: MouseEvent): void {
  if (suppressClick && event.detail !== 0) {
    suppressClick = false
    return
  }
  suppressClick = false
  closePicker()
  toggleTheme()
}

function chooseTheme(value: ColorTheme): void {
  selectTheme(value)
  closePicker(true)
}

function handleOutsidePointer(event: PointerEvent): void {
  if (event.target instanceof Node && !picker.value?.contains(event.target)) {
    cancelHold()
    closePicker()
  }
}

function handleFocusOut(event: FocusEvent): void {
  if (!(event.relatedTarget instanceof Node) || !picker.value?.contains(event.relatedTarget)) {
    closePicker()
  }
}

function handleBlur(): void {
  cancelHold()
  closePicker()
}

onMounted(() => {
  document.addEventListener('pointerdown', handleOutsidePointer, { passive: true, capture: true })
  window.addEventListener('blur', handleBlur)
})

onBeforeUnmount(() => {
  clearHold()
  document.removeEventListener('pointerdown', handleOutsidePointer, true)
  window.removeEventListener('blur', handleBlur)
})
</script>

<template>
  <div
    ref="picker"
    class="theme-picker fixed right-2 top-2 z-[70] rounded-lg border border-luxury-gold/40 bg-luxury-card/95 p-1 text-luxury-gold shadow-premium backdrop-blur-sm"
    @keydown.esc.stop.prevent="closePicker(true)"
    @focusout="handleFocusOut"
  >
    <fieldset
      v-if="isPickerOpen"
      :id="paletteId"
      ref="paletteOptions"
      class="absolute right-0 top-[calc(100%+0.5rem)] flex gap-1 rounded-lg border border-luxury-gold/40 bg-luxury-card/95 p-1 shadow-premium backdrop-blur-sm"
    >
      <legend class="sr-only">Color theme</legend>
      <label
        v-for="palette in themes"
        :key="palette.id"
        class="theme-swatch"
        :title="`${palette.label} theme`"
      >
        <input
          type="radio"
          name="wedding-color-theme"
          :value="palette.id"
          :checked="colorTheme === palette.id"
          :aria-label="`${palette.label} theme`"
          @change="chooseTheme(palette.id)"
          @click="colorTheme === palette.id && closePicker(true)"
        >
        <span :style="{ backgroundColor: palette.swatch }" aria-hidden="true" />
      </label>
    </fieldset>
  <button
    ref="modeButton"
    type="button"
    class="theme-toggle flex h-10 w-10 touch-manipulation select-none items-center justify-center rounded-md text-luxury-gold focus:outline-none focus:ring-2 focus:ring-luxury-gold/60"
    :aria-label="isDark ? 'Switch to light theme' : 'Switch to dark theme'"
    :title="`${isDark ? 'Switch to light theme' : 'Switch to dark theme'}; hold for colors`"
    :aria-expanded="isPickerOpen"
    :aria-controls="paletteId"
    @pointerdown="startHold"
    @pointermove="moveHold"
    @pointerup="finishHold"
    @pointercancel="cancelHold"
    @lostpointercapture="cancelHold"
    @contextmenu.prevent
    @keydown.down.prevent="openPickerWithKeyboard"
    @click="handleModeClick"
  >
    <svg v-if="isDark" aria-hidden="true" viewBox="0 0 24 24" class="h-4 w-4 fill-none stroke-current stroke-2">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
    <svg v-else aria-hidden="true" viewBox="0 0 24 24" class="h-4 w-4 fill-none stroke-current stroke-2">
      <path d="M21 12.8A8.5 8.5 0 1 1 11.2 3 6.6 6.6 0 0 0 21 12.8Z" />
    </svg>
  </button>
  </div>
</template>

<style scoped>
.theme-swatch {
  position: relative;
  display: grid;
  width: 2.5rem;
  height: 2.5rem;
  place-items: center;
  cursor: pointer;
}

.theme-swatch input {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  opacity: 0;
  cursor: pointer;
}

.theme-swatch span {
  width: 1.25rem;
  height: 1.25rem;
  border: 2px solid var(--color-luxury-card);
  border-radius: 50%;
  pointer-events: none;
}

.theme-swatch input:checked + span {
  outline: 2px solid var(--color-luxury-gold);
  outline-offset: 2px;
}

.theme-swatch input:focus-visible + span {
  outline: 2px solid var(--color-luxury-cream);
  outline-offset: 4px;
}
</style>
