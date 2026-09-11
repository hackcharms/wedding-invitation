<script setup lang="ts">
import { ref, useSlots, computed, onMounted, onBeforeUnmount } from 'vue'
import EmblaCarousel from 'embla-carousel'
import Autoplay from 'embla-carousel-autoplay'
import { type EmblaCarouselType } from 'embla-carousel'

const slots = useSlots()
const emblaViewportRef = ref<HTMLDivElement | null>(null)
let emblaMainApi: EmblaCarouselType | undefined

const selectedIndex = ref<number>(0)
const scrollSnaps = ref<number[]>([])
const panelOpacities = ref<number[]>([])

defineSlots<{
  [key: `panel-${number}`]: () => any
}>()

const panelCount = computed(() => Object.keys(slots).length)

const onSelect = (api: EmblaCarouselType) => {
  selectedIndex.value = api.selectedScrollSnap()
  updateOpacities()
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
  if (emblaMainApi) {
    emblaMainApi.scrollTo(index)
  }
}

const handleWheel = (e: WheelEvent) => {
  e.preventDefault()

  if (!emblaMainApi) return

  const isScrollingDown = e.deltaY > 0
  const currentIndex = emblaMainApi.selectedScrollSnap()

  if (isScrollingDown && currentIndex < panelCount.value - 1) {
    emblaMainApi.scrollNext()
  } else if (!isScrollingDown && currentIndex > 0) {
    emblaMainApi.scrollPrev()
  }
}

onMounted(() => {
  if (!emblaViewportRef.value) return

  const autoplayPlugin = Autoplay({
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
      class="h-screen w-screen overflow-hidden bg-[radial-gradient(circle_at_50%_20%,rgba(20,38,33,0.8),rgba(6,11,9,1)_30%,rgba(3,8,7,1)_100%)]"
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
            <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(212,175,55,0.16),rgba(6,19,15,0.22)_30%,rgba(6,19,15,0.9)_74%)]"></div>
            <div class="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,14,11,0.12)_0%,rgba(4,10,8,0.7)_65%,rgba(4,10,8,0.94)_100%)]"></div>
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
</style>
