<script setup lang="ts">
import FlowerAccent from '@/components/ui/FlowerAccent.vue'
import { flowerAssets } from '@/config/flowerAssets'
import { ref, useSlots, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import EmblaCarousel from 'embla-carousel'
import Autoplay from 'embla-carousel-autoplay'
import { type EmblaCarouselType } from 'embla-carousel'

const props = withDefaults(defineProps<{
  lockedPanelIndices?: number[]
}>(), {
  lockedPanelIndices: () => []
})

const slots = useSlots()
const emblaViewportRef = ref<HTMLDivElement | null>(null)
let emblaMainApi: EmblaCarouselType | undefined
let autoplayPlugin: ReturnType<typeof Autoplay> | undefined

const selectedIndex = ref<number>(0)
const scrollSnaps = ref<number[]>([])
const panelOpacities = ref<number[]>([1])

defineSlots<{
  [key: `panel-${number}`]: () => any
}>()

const panelCount = computed(() => Object.keys(slots).length)

const onSelect = (api: EmblaCarouselType) => {
  selectedIndex.value = api.selectedScrollSnap()
  updateOpacities()

  if (props.lockedPanelIndices.length > 0) {
    const firstLockedIndex = Math.min(...props.lockedPanelIndices)
    if (selectedIndex.value >= firstLockedIndex) {
      autoplayPlugin?.stop()
      if (selectedIndex.value !== firstLockedIndex - 1) {
        api.scrollTo(firstLockedIndex - 1)
      }
      return
    }
  }

  const nextIndex = selectedIndex.value + 1
  if (props.lockedPanelIndices.includes(nextIndex)) {
    autoplayPlugin?.stop()
  }
}

const updateOpacities = () => {
  if (!emblaMainApi) return

  const scrollProgress = emblaMainApi.scrollProgress()
  const selectedSnap = emblaMainApi.selectedScrollSnap()

  panelOpacities.value = Array.from({ length: panelCount.value }).map((_, index) => {
    if (index === selectedSnap) return 1
    if (index === selectedSnap + 1) {
      return Math.max(0, scrollProgress - selectedSnap)
    }
    if (index === selectedSnap - 1) {
      return Math.max(0, 1 - (scrollProgress - (selectedSnap - 1)))
    }
    return 0
  })
}

const scrollToPanel = (index: number) => {
  autoplayPlugin?.stop()

  if (emblaMainApi && !props.lockedPanelIndices.includes(index)) {
    emblaMainApi.scrollTo(index)
  }
}

const handleWheel = (e: WheelEvent) => {
  e.preventDefault()

  if (!emblaMainApi) return

  autoplayPlugin?.stop()

  const isScrollingDown = e.deltaY > 0
  const currentIndex = emblaMainApi.selectedScrollSnap()

  if (isScrollingDown && currentIndex < panelCount.value - 1) {
    const nextIndex = currentIndex + 1
    if (!props.lockedPanelIndices.includes(nextIndex)) emblaMainApi.scrollNext()
  } else if (!isScrollingDown && currentIndex > 0) {
    emblaMainApi.scrollPrev()
  }
}

onMounted(() => {
  if (!emblaViewportRef.value) return

  autoplayPlugin = Autoplay({
    delay: 5000,
    stopOnInteraction: true,
    stopOnLastSnap: true,
  })

  emblaMainApi = EmblaCarousel(
    emblaViewportRef.value,
    {
      loop: false,
      axis: 'y',
      align: 'start',
      skipSnaps: false,
      watchDrag: true,
      dragFree: false,
    },
    [autoplayPlugin]
  )

  scrollSnaps.value = emblaMainApi.scrollSnapList()
  emblaMainApi.on('select', onSelect)
  emblaMainApi.on('scroll', updateOpacities)
  onSelect(emblaMainApi)

  if (emblaViewportRef.value) {
    emblaViewportRef.value.addEventListener('wheel', handleWheel, { passive: false })
  }
})

watch(
  () => props.lockedPanelIndices,
  (lockedPanelIndices) => {
    if (lockedPanelIndices.length === 0) {
      autoplayPlugin?.play()
    }
  }
)

onBeforeUnmount(() => {
  if (emblaViewportRef.value) {
    emblaViewportRef.value.removeEventListener('wheel', handleWheel)
  }

  if (emblaMainApi) {
    emblaMainApi.destroy()
  }
})
</script>

<template>
  <div class="relative h-screen w-screen overflow-hidden">
    <div
      ref="emblaViewportRef"
        class="invitation-canvas h-screen w-screen overflow-hidden bg-[radial-gradient(circle_at_50%_20%,rgba(20,38,33,0.8),rgba(6,11,9,1)_30%,rgba(3,8,7,1)_100%)]"
    >
      <div class="flex h-screen flex-col">
        <div
          v-for="(_, index) in panelCount"
          :key="index"
          class="intro-panel relative flex h-screen w-screen shrink-0 items-center justify-center px-4 transition-all duration-700 ease-out"
          :class="{ 'is-active': index === selectedIndex }"
          :style="{
            opacity: panelOpacities[index] ?? 1,
            transform: `translateY(${index === selectedIndex ? 0 : 18}px) scale(${index === selectedIndex ? 1 : 0.98})`,
            filter: `blur(${index === selectedIndex ? 0 : 1.5}px)`,
          }"
        >
          <div class="pointer-events-none absolute inset-0">
            <div class="absolute -left-10 -top-16 h-64 w-64 rounded-full bg-luxury-gold/12 blur-3xl"></div>
            <div class="absolute -right-20 top-1/3 h-80 w-80 rounded-full bg-luxury-emerald/30 blur-3xl"></div>
            <div class="invitation-overlay invitation-overlay-glow absolute inset-0"></div>
            <div class="invitation-overlay invitation-overlay-shade absolute inset-0"></div>
          </div>

          <div
            class="botanical-frame pointer-events-none absolute inset-0 z-0 overflow-hidden text-luxury-gold"
            :class="`botanical-layout-${index % 5}`"
            :style="{ '--botanical-delay': `${index * -0.8}s` }"
          >
            <div class="botanical-spray-anchor botanical-spray-anchor--left">
              <FlowerAccent
                v-if="index % 3 === 0"
                :src="flowerAssets[(index * 2) % flowerAssets.length]"
                :tone="index % 3 === 0 ? 'gold' : index % 3 === 1 ? 'sage' : 'cream'"
                class="h-full w-full"
              />
            </div>
            <div class="botanical-spray-anchor botanical-spray-anchor--right">
              <FlowerAccent
                :src="flowerAssets[(index * 2 + 1) % flowerAssets.length]"
                :tone="index % 3 === 0 ? 'cream' : index % 3 === 1 ? 'gold' : 'sage'"
                class="h-full w-full"
              />
            </div>
          </div>

          <div class="intro-stage relative z-10 flex h-full w-full max-w-140 flex-col items-center justify-center space-y-5 text-center">
            <slot :name="`panel-${index + 1}`" />
          </div>
        </div>
      </div>
    </div>

    <div class="pointer-events-auto fixed right-5 top-1/2 z-20 flex -translate-y-1/2 flex-col items-center gap-3">
      <div class="flex h-28 w-px items-center justify-center">
        <div class="flex h-full w-px flex-col justify-between py-2">
          <button
            v-for="(_, index) in scrollSnaps"
            :key="index"
            :class="[
              'h-3 w-3 rounded-full border border-luxury-gold/70 transition-all duration-300 cursor-pointer',
              index === selectedIndex
                ? 'scale-110 bg-luxury-gold shadow-[0_0_20px_rgba(212,175,55,0.7)]'
                : 'bg-transparent hover:bg-luxury-gold/50',
            ]"
            @click="scrollToPanel(index)"
            :aria-label="`Go to panel ${index + 1}`"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.intro-panel {
  position: relative;
}

.intro-panel.is-active .intro-stage {
  animation: fadeUp 900ms cubic-bezier(0.22, 1, 0.36, 1);
}

.botanical-spray-anchor {
  position: absolute;
  width: clamp(5rem, 9vw, 8rem);
  height: clamp(8rem, 18vh, 13rem);
  opacity: 0.42;
  transform-origin: center;
}

.botanical-spray-anchor--left {
  bottom: 14%;
  left: 2rem;
}

.botanical-spray-anchor--right {
  top: 14%;
  right: 2rem;
}

.intro-panel.is-active .botanical-spray-anchor {
  animation: botanicalDrift 8s ease-in-out infinite;
  animation-delay: var(--botanical-delay, 0s);
}

.botanical-layout-1 .botanical-spray-anchor--left {
  top: 14%;
  bottom: auto;
  transform: rotate(10deg);
}

.botanical-layout-1 .botanical-spray-anchor--right {
  top: auto;
  bottom: 14%;
  transform: rotate(-8deg);
}

.botanical-layout-2 .botanical-spray-anchor--left {
  bottom: 24%;
  transform: rotate(-10deg);
}

.botanical-layout-2 .botanical-spray-anchor--right {
  top: 24%;
  transform: rotate(10deg);
}

.botanical-layout-3 .botanical-spray-anchor--left {
  bottom: 18%;
  transform: rotate(-6deg);
}

.botanical-layout-3 .botanical-spray-anchor--right {
  top: 18%;
  transform: rotate(8deg);
}

.botanical-layout-4 .botanical-spray-anchor--left {
  bottom: 24%;
  transform: rotate(8deg);
}

.botanical-layout-4 .botanical-spray-anchor--right {
  top: 24%;
  transform: rotate(-10deg);
}

.intro-panel.is-active::before {
  content: "";
  position: absolute;
  inset: 12% 14% auto 14%;
  height: 50%;
  border-radius: 9999px;
  background: radial-gradient(circle, rgba(212, 175, 55, 0.18), rgba(212, 175, 55, 0) 70%);
  filter: blur(28px);
  opacity: 0;
  animation: glowPulse 1400ms ease-out 120ms forwards;
}

@keyframes fadeUp {
  0% {
    opacity: 0;
    transform: translateY(18px) scale(0.98);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes glowPulse {
  0% {
    opacity: 0;
    transform: scale(0.9);
  }
  30% {
    opacity: 0.7;
  }
  100% {
    opacity: 0.35;
    transform: scale(1.08);
  }
}

@keyframes botanicalDrift {
  0%, 100% {
    translate: 0 0;
  }
  50% {
    translate: 0 -7px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .intro-panel.is-active .botanical-spray-anchor {
    animation: none;
  }
}

@media (max-width: 480px) {
  .botanical-spray-anchor {
    width: 5rem;
    height: 8rem;
    opacity: 0.34;
  }

  .botanical-spray-anchor--left {
    top: auto;
    bottom: 1.5rem;
    left: 1rem;
  }

  .botanical-spray-anchor--right {
    top: auto;
    right: 1rem;
    bottom: 1.5rem;
  }

  .botanical-layout-1 .botanical-spray-anchor--left,
  .botanical-layout-2 .botanical-spray-anchor--left,
  .botanical-layout-3 .botanical-spray-anchor--left,
  .botanical-layout-4 .botanical-spray-anchor--left,
  .botanical-layout-1 .botanical-spray-anchor--right,
  .botanical-layout-2 .botanical-spray-anchor--right,
  .botanical-layout-3 .botanical-spray-anchor--right,
  .botanical-layout-4 .botanical-spray-anchor--right {
    top: auto;
  }

  .botanical-layout-1 .botanical-spray-anchor--left {
    bottom: 3rem;
  }

  .botanical-layout-1 .botanical-spray-anchor--right,
  .botanical-layout-2 .botanical-spray-anchor--left,
  .botanical-layout-4 .botanical-spray-anchor--left {
    bottom: 1.5rem;
  }

  .botanical-layout-2 .botanical-spray-anchor--right {
    bottom: 3rem;
  }

  .botanical-layout-3 .botanical-spray-anchor--left,
  .botanical-layout-3 .botanical-spray-anchor--right,
  .botanical-layout-4 .botanical-spray-anchor--right {
    bottom: 2.25rem;
  }
}
</style>
