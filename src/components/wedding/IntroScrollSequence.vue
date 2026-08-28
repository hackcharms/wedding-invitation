<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, useSlots, watch } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
// import ScrollToNext from './ScrollToNext.vue'

const slots = useSlots()
const props = withDefaults(defineProps<{}>(), {})

defineSlots<{
  [key: `panel-${number}`]: () => any
}>()
const introSequenceRef = ref<HTMLElement | null>(null)

let introTl: gsap.core.Timeline | null = null
let introMounted = false
let setupAttempts = 0

gsap.registerPlugin(ScrollTrigger)

const clearIntroAnimations = () => {
  if (introTl) {
    introTl.kill()
    introTl = null
  }

  ScrollTrigger.getAll().forEach((trigger) => {
    if (trigger.vars.id === 'invitation-intro-sequence') {
      trigger.kill()
    }
  })

  introMounted = false
  setupAttempts = 0
}

const setupIntroAnimations = async () => {
  if (introMounted || !introSequenceRef.value) return

  await nextTick()

  const panels = Array.from(introSequenceRef.value.querySelectorAll<HTMLElement>('.intro-panel'))

  if (!panels.length) {
    setupAttempts += 1
    if (setupAttempts <= 6) {
      requestAnimationFrame(() => {
        void setupIntroAnimations()
      })
    }
    return
  }

  const stageNodes = panels
    .map((panel) => panel.querySelector<HTMLElement>('.intro-stage'))
    .filter((node): node is HTMLElement => Boolean(node))

  gsap.set(panels[0], { autoAlpha: 1, scale: 1, yPercent: 0 })
  if (panels.length > 1) gsap.set(panels.slice(1), { autoAlpha: 0, scale: 1, yPercent: 0 })
  if (stageNodes.length > 1) gsap.set(stageNodes.slice(1), { autoAlpha: 0, yPercent: 8, scale: 0.98 })
  if (stageNodes[0]) gsap.set(stageNodes[0], { autoAlpha: 1, yPercent: 0, scale: 1 })

  introTl = gsap.timeline({
    defaults: { ease: 'power2.out' },
    scrollTrigger: {
      id: 'invitation-intro-sequence',
      trigger: introSequenceRef.value,
      start: 'top top',
      end: `+=${Math.max(panels.length, 1) * 70}%`,
      scrub: 0.25,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  })

  panels.forEach((panel, index) => {
    const stage = panel.querySelector<HTMLElement>('.intro-stage')
    const start = index * 0.7
    const revealStart = start + 0.02
    const exitStart = start + 0.38

    if (index > 0) {
      introTl?.to(panel, { autoAlpha: 1, duration: 0.22 }, revealStart)
    }

    if (stage) {
      introTl?.to(stage, { autoAlpha: 1, yPercent: 0, scale: 1, duration: 0.24 }, revealStart)
    }

    introTl?.to(panel, { scale: 0.965, yPercent: -3, autoAlpha: 0, duration: 0.3 }, exitStart)
  })

  ScrollTrigger.refresh()
  introMounted = true
}

watch(
  () => slots.default,
  async () => {
    clearIntroAnimations()
    await setupIntroAnimations()
  },
  { flush: 'post' },
)

onMounted(async () => {
  await setupIntroAnimations()
})

onBeforeUnmount(() => {
  clearIntroAnimations()
})
</script>

<template>
  <section ref="introSequenceRef" class="relative h-screen overflow-hidden bg-[#06130f] touch-pan-y select-none">
    <!-- <ScrollToNext /> -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute -top-16 -left-8 w-56 h-56 rounded-full bg-luxury-gold/20 blur-3xl"></div>
      <div class="absolute top-1/3 -right-20 w-80 h-80 rounded-full bg-luxury-emerald/35 blur-3xl"></div>
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(212,175,55,0.16),rgba(6,19,15,0.25)_35%,rgba(6,19,15,0.95)_75%)]"></div>
      <div class="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,14,11,0.3)_0%,rgba(4,10,8,0.75)_60%,rgba(4,10,8,0.94)_100%)]"></div>
    </div>
    <article 
    v-for="(_, index) in Object.keys(slots).length" :key="index"
    class="intro-panel absolute inset-0 flex items-center justify-center px-4 text-center">
        <div class="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08),rgba(6,19,15,0.2)_30%,rgba(6,19,15,0.9)_78%)]"></div>
        <div class="intro-stage relative z-10 w-full space-y-5 h-full flex flex-col items-center justify-center">
                <slot :name="`panel-${index + 1}`" />
        </div>
    </article>
  </section>
</template>