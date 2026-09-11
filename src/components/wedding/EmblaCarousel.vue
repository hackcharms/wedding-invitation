<script setup lang="ts">
import { ref, useSlots, computed, onMounted, onBeforeUnmount } from 'vue'
import EmblaCarousel from 'embla-carousel'
import Autoplay from 'embla-carousel-autoplay'
import { type EmblaCarouselType } from 'embla-carousel'

const slots = useSlots()
const emblaViewportRef = ref<HTMLDivElement | null>(null)
const emblaContainerRef = ref<HTMLDivElement | null>(null)
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
  
  // Calculate opacity for each panel
  panelOpacities.value = Array.from({ length: panelCount.value }).map((_, index) => {
    // Current panel has full opacity
    if (index === selectedSnap) return 1
    // Next panel fades in as you scroll
    if (index === selectedSnap + 1) {
      return Math.max(0, scrollProgress - selectedSnap)
    }
    // Previous panel fades out
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

  // Create autoplay plugin instance
  const autoplayPlugin = Autoplay({
    delay: 5000, // 5 seconds between slides
    stopOnInteraction: true, // Stop autoplay on user interaction
    stopOnLastSnap: true, // Stop when reaching last slide
  })

  // Initialize carousel with Y-axis (vertical) scrolling and autoplay plugin
  emblaMainApi = EmblaCarousel(emblaViewportRef.value, {
    loop: false,
    axis: 'y',
    align: 'start',
    skipSnaps: false,
    watchDrag: true,
    dragFree: false,
  }, [autoplayPlugin])

  scrollSnaps.value = emblaMainApi.scrollSnapList()
  emblaMainApi.on('select', onSelect)
  emblaMainApi.on('scroll', updateOpacities)
  onSelect(emblaMainApi)

  // Add wheel event listener
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
    <!-- Embla Viewport - this is the clipping container -->
    <div
      ref="emblaViewportRef"
      class="h-screen w-screen overflow-hidden bg-luxury-dark"
    >
      <!-- Embla Container - this holds all slides and moves -->
      <div
        ref="emblaContainerRef"
        class="flex flex-col h-screen"
      >
        <!-- Panels/Slides -->
        <div
          v-for="(_, index) in panelCount"
          :key="index"
          class="intro-panel flex-shrink-0 w-screen h-screen flex items-center justify-center px-4 relative transition-opacity duration-300"
          :style="{ opacity: panelOpacities[index] ?? 1 }"
        >
          <!-- Background decorations -->
          <div class="absolute inset-0 pointer-events-none">
            <div class="absolute -top-16 -left-8 w-56 h-56 rounded-full bg-luxury-gold/20 blur-3xl"></div>
            <div class="absolute top-1/3 -right-20 w-80 h-80 rounded-full bg-luxury-emerald/35 blur-3xl"></div>
            <div
              class="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(212,175,55,0.16),rgba(6,19,15,0.25)_35%,rgba(6,19,15,0.95)_75%)]"
            ></div>
            <div
              class="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,14,11,0.3)_0%,rgba(4,10,8,0.75)_60%,rgba(4,10,8,0.94)_100%)]"
            ></div>
          </div>

          <!-- Panel content -->
          <div class="intro-stage relative z-10 w-full space-y-5 h-full flex flex-col items-center justify-center text-center">
            <slot :name="`panel-${index + 1}`" />
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll Indicator Dots -->
    <div class="fixed right-6 top-1/2 transform -translate-y-1/2 z-20 flex flex-col gap-2 pointer-events-auto">
      <button
        v-for="(_, index) in scrollSnaps"
        :key="index"
        :class="[
          'w-2 h-2 rounded-full transition-all duration-300 cursor-pointer',
          index === selectedIndex
            ? 'bg-luxury-gold h-8'
            : 'bg-luxury-gold/40 hover:bg-luxury-gold/60',
        ]"
        @click="scrollToPanel(index)"
        :aria-label="`Go to panel ${index + 1}`"
      />
    </div>
  </div>
</template>

<style scoped>
.intro-panel {
  position: relative;
}
</style>
