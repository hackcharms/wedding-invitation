
<script setup lang="ts">
import { computed, useTemplateRef } from 'vue'
import { usePetalAnimation, type PetalAnimationOptions } from '@/composables/usePetalAnimation'

type Props = Partial<PetalAnimationOptions> & {
  backgroundUrl?: string
  overlay?: boolean
  controls?: boolean
  pauseOnHover?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  backgroundUrl: '',
  overlay: false,
  petalCount: 55,
  minSize: 8,
  maxSize: 23,
  minSpeed: 12,
  maxSpeed: 48,
  wind: 0,
  sway: 18,
  opacity: 0.85,
  paused: false,
  controls: false,
  pauseOnHover: false,
  respectReducedMotion: true,
  maxDpr: 2,
})

const emit = defineEmits<{
  (e: 'play'): void
  (e: 'pause'): void
}>()

const container = useTemplateRef<HTMLElement>('container')
const canvas = useTemplateRef<HTMLCanvasElement>('canvas')
const { isPaused, play, pause, restart } = usePetalAnimation(props, { container, canvas }, {
  onPlay: () => emit('play'),
  onPause: () => emit('pause'),
})

const backgroundStyle = computed(() => ({
  backgroundImage: props.backgroundUrl
    ? `url("${props.backgroundUrl.replace(/["\\\n\r]/g, '')}")`
    : undefined,
}))

function handleMouseEnter(): void {
  if (props.pauseOnHover) pause()
}

function handleMouseLeave(): void {
  if (props.pauseOnHover) play()
}

defineExpose({
  play,
  pause,
  restart,
  isPaused,
})
</script>

<template>
  <div
    ref="container"
    class="petal-animation"
    :class="{ 'petal-animation--overlay': overlay }"
    :style="overlay ? undefined : backgroundStyle"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <canvas
      ref="canvas"
      class="petal-animation__canvas"
      aria-hidden="true"
    />

    <div
      v-if="controls"
      class="petal-animation__controls"
    >
      <button
        type="button"
        @click="isPaused ? play() : pause()"
      >
        {{ isPaused ? 'Play' : 'Pause' }}
      </button>

      <button type="button" @click="restart">
        Restart
      </button>
    </div>
  </div>
</template>

<style scoped>
.petal-animation {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  width: 100%;
  aspect-ratio: 1 / 1;
  background-color: #f5f7f2;
  background-image: linear-gradient(145deg, #fffdf7 0%, #f1f5ef 50%, #e3ede7 100%);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.petal-animation__canvas {
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.petal-animation--overlay {
  position: fixed;
  inset: 0;
  z-index: 10;
  height: 100%;
  aspect-ratio: auto;
  background: none;
  pointer-events: none;
}

.petal-animation__controls {
  position: absolute;
  z-index: 1;
  right: 1rem;
  bottom: 1rem;
  display: flex;
  gap: 0.5rem;
  pointer-events: auto;
}

.petal-animation__controls button {
  padding: 0.6rem 1rem;
  border: 1px solid #f3c4d5;
  border-radius: 999px;
  background: rgb(255 255 255 / 90%);
  color: #8e3159;
  font: inherit;
  cursor: pointer;
}

.petal-animation__controls button:focus-visible {
  outline: 2px solid #8e3159;
  outline-offset: 3px;
}
</style>
