<script setup lang="ts">
import { nextTick, onBeforeUnmount, ref } from 'vue'
import { gsap } from 'gsap'
import FlowerAccent from '@/components/ui/FlowerAccent.vue'
import { flowerAssets } from '@/config/flowerAssets'

const emit = defineEmits<{
	opening: []
	unlocked: []
}>()

const isClosed = ref(true)
const isOpening = ref(false)
const topFlapRef = ref<HTMLElement | null>(null)
const leftFlapRef = ref<HTMLElement | null>(null)
const rightFlapRef = ref<HTMLElement | null>(null)
const bottomFlapRef = ref<HTMLElement | null>(null)
const sealRef = ref<HTMLElement | null>(null)
const gateRef = ref<HTMLElement | null>(null)

let animation: gsap.core.Timeline | null = null

async function openEnvelope() {
	if (isOpening.value || !isClosed.value) return

	isOpening.value = true
	emit('opening')
	await nextTick()

	const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
	if (reduceMotion) {
		isClosed.value = false
		emit('unlocked')
		return
	}

	animation = gsap.timeline({
		defaults: { ease: 'power3.inOut' },
		onComplete: () => {
			isClosed.value = false
			emit('unlocked')
		},
	})

	animation
		.to(sealRef.value, { scale: 0.78, rotation: 18, opacity: 0, duration: 0.42, ease: 'power2.in' })
		.to(topFlapRef.value, { rotateX: -172, yPercent: -8, duration: 0.95, transformOrigin: '50% 0%' }, '<0.08')
		.to(leftFlapRef.value, { xPercent: -112, rotation: -4, duration: 1.05, transformOrigin: '100% 50%' }, '-=0.58')
		.to(rightFlapRef.value, { xPercent: 112, rotation: 4, duration: 1.05, transformOrigin: '0% 50%' }, '<')
		.to(bottomFlapRef.value, { yPercent: 108, rotateX: 12, duration: 0.9, transformOrigin: '50% 100%' }, '-=0.78')
		.to(gateRef.value, { autoAlpha: 0, duration: 0.42, ease: 'power2.inOut' }, '-=0.48')
}

onBeforeUnmount(() => {
	animation?.kill()
})
</script>

<template>
	<div v-if="isClosed" ref="gateRef" class="envelope-gate fixed inset-0 z-50 overflow-hidden">
		<div class="envelope-atmosphere absolute inset-0"></div>

		<div class="envelope-surface absolute inset-0">
			<div ref="topFlapRef" class="envelope-fold envelope-top-flap absolute inset-x-0 top-0 h-[58%]">
				<svg class="flap-edge-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path d="M 0 0 L 50 100 L 100 0" /></svg>
			</div>
			<div ref="leftFlapRef" class="envelope-fold envelope-left-flap absolute inset-y-0 left-0 w-1/2">
				<!-- <div class="envelope-botanical envelope-botanical-left">
					<FlowerAccent :src="flowerAssets[7]" tone="gold" class="h-full w-full" />
				</div> -->
				<svg class="flap-edge-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path d="M 0 0 L 100 50 L 0 100" /></svg>
			</div>
			<div ref="rightFlapRef" class="envelope-fold envelope-right-flap absolute inset-y-0 right-0 w-1/2">
				<div class="envelope-botanical envelope-botanical-right">
					<FlowerAccent :src="flowerAssets[7]" tone="cream" class="h-full w-full" />
				</div>
				<svg class="flap-edge-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path d="M 100 0 L 0 50 L 100 100" /></svg>
			</div>
			<div ref="bottomFlapRef" class="envelope-fold envelope-bottom-flap absolute inset-x-0 bottom-0 h-[58%]">
				<svg class="flap-edge-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path d="M 0 100 L 50 0 L 100 100" /></svg>
			</div>

			<div ref="sealRef" class="envelope-seal absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
				<button type="button" class="envelope-seal-button" :disabled="isOpening" @click="openEnvelope">
					<span class="envelope-seal-ring"></span>
					<span class="envelope-seal-star">✦</span>
					<span class="envelope-seal-copy">
						<span>Open</span>
						<strong>Love</strong>
					</span>
				</button>
			</div>
		</div>
	</div>
</template>

<style scoped>
.envelope-gate {
	background: var(--color-luxury-dark);
	perspective: 1500px;
}

.envelope-atmosphere {
	background:
		radial-gradient(circle at 50% 50%, color-mix(in srgb, var(--color-luxury-gold) 18%, transparent), transparent 22%),
		radial-gradient(ellipse at 50% 18%, color-mix(in srgb, var(--color-luxury-emerald) 88%, transparent), transparent 62%),
		linear-gradient(180deg, var(--color-luxury-card) 0%, var(--color-luxury-dark) 72%, var(--color-luxury-dark) 100%);
}

.envelope-surface {
	isolation: isolate;
}

.envelope-surface::after {
	content: '';
	position: absolute;
	inset: 0;
	pointer-events: none;
	opacity: 0.22;
	background: repeating-linear-gradient(118deg, transparent 0 5rem, rgba(255, 220, 191, 0.09) 5.1rem 5.18rem, transparent 5.3rem 10rem);
	mix-blend-mode: screen;
}

.envelope-letter {
	z-index: 1;
	background: linear-gradient(145deg, #fffaf0, #eadfc9);
	border-color: rgba(164, 111, 42, 0.35);
	box-shadow: 0 12px 32px rgba(11, 3, 7, 0.32);
}

.envelope-letter-line {
	height: 1px;
	background: rgba(124, 81, 42, 0.28);
}

.envelope-fold {
	z-index: 3;
	backface-visibility: hidden;
	transform-style: preserve-3d;
	border: 2px solid color-mix(in srgb, var(--color-luxury-gold) var(--envelope-edge-alpha), transparent);
	filter: drop-shadow(0 18px 24px color-mix(in srgb, var(--color-luxury-dark) 50%, transparent)) drop-shadow(0 0 2px color-mix(in srgb, var(--color-luxury-cream) var(--envelope-edge-highlight), transparent));
}

.envelope-botanical {
	position: absolute;
	z-index: 4;
	width: clamp(7.5rem, 11vw, 10rem);
	height: clamp(11rem, 26vh, 17rem);
	color: var(--color-luxury-gold);
	opacity: 0.46;
	pointer-events: none;
	top: 50%;
	transform: translateY(-50%);
	animation: envelopeBotanicalDrift 7s ease-in-out infinite;
}

.envelope-botanical-left {
	left: 0.75rem;
}

.envelope-botanical-right {
	width: 220in;
	right: 0.75rem;
	animation-delay: -2.4s;
}

@keyframes envelopeBotanicalDrift {
	0%, 100% {
		translate: 0 0;
	}
	50% {
		translate: 0 -5px;
	}
}

.flap-edge-lines {
	position: absolute;
	inset: 0;
	z-index: 5;
	width: 100%;
	height: 100%;
	pointer-events: none;
	overflow: visible;
}

.flap-edge-lines path {
	fill: none;
	stroke: color-mix(in srgb, var(--color-luxury-gold) var(--envelope-edge-alpha), transparent);
	stroke-width: 0.75;
	stroke-linecap: round;
	stroke-linejoin: round;
	vector-effect: non-scaling-stroke;
	filter: drop-shadow(0 0 1px color-mix(in srgb, var(--color-luxury-cream) var(--envelope-edge-highlight), transparent));
}

.envelope-top-flap {
	clip-path: polygon(0 0, 100% 0, 50% 100%);
	background:
		radial-gradient(ellipse at 50% 100%, color-mix(in srgb, var(--color-luxury-gold) 12%, transparent), transparent 34%),
		linear-gradient(154deg, var(--color-luxury-emerald) 0%, var(--color-luxury-card) 52%, var(--color-luxury-dark) 100%);
	transform-origin: 50% 0%;
}

.envelope-bottom-flap {
	clip-path: polygon(0 100%, 100% 100%, 50% 0);
	background:
		radial-gradient(ellipse at 50% 0%, color-mix(in srgb, var(--color-luxury-gold) 10%, transparent), transparent 34%),
		linear-gradient(28deg, var(--color-luxury-dark) 0%, var(--color-luxury-card) 55%, var(--color-luxury-emerald) 100%);
	transform-origin: 50% 100%;
}

.envelope-left-flap {
	clip-path: polygon(0 0, 100% 50%, 0 100%);
	background:
		radial-gradient(ellipse at 100% 50%, color-mix(in srgb, var(--color-luxury-gold) 10%, transparent), transparent 34%),
		linear-gradient(110deg, var(--color-luxury-emerald) 0%, var(--color-luxury-card) 50%, var(--color-luxury-dark) 100%);
	transform-origin: 100% 50%;
}

.envelope-right-flap {
	clip-path: polygon(100% 0, 0 50%, 100% 100%);
	background:
		radial-gradient(ellipse at 0% 50%, color-mix(in srgb, var(--color-luxury-gold) 10%, transparent), transparent 34%),
		linear-gradient(250deg, var(--color-luxury-emerald) 0%, var(--color-luxury-card) 50%, var(--color-luxury-dark) 100%);
	transform-origin: 0% 50%;
}

.envelope-fold::after {
	content: '';
	position: absolute;
	inset: 0;
	opacity: 0.12;
	background: repeating-linear-gradient(135deg, transparent 0 4rem, color-mix(in srgb, var(--color-luxury-cream) 8%, transparent) 4.1rem 4.2rem, transparent 4.3rem 8rem);
	mix-blend-mode: screen;
}

.envelope-fold::before {
	content: '';
	position: absolute;
	inset: 0;
	pointer-events: none;
	background: linear-gradient(135deg, color-mix(in srgb, var(--color-luxury-cream) 12%, transparent), transparent 34%, color-mix(in srgb, var(--color-luxury-dark) 28%, transparent) 78%);
	mix-blend-mode: screen;
	opacity: 0.6;
}

.envelope-seam {
	z-index: 4;
	background: linear-gradient(transparent, color-mix(in srgb, var(--color-luxury-gold) var(--envelope-seam-alpha), transparent) 45%, color-mix(in srgb, var(--color-luxury-cream) var(--envelope-seam-highlight), transparent) 50%, color-mix(in srgb, var(--color-luxury-dark) 78%, transparent) 58%, transparent);
	box-shadow: 0 0 7px color-mix(in srgb, var(--color-luxury-gold) var(--envelope-seam-alpha), transparent);
	transform-origin: center;
}

.envelope-seam-left {
	transform: rotate(48deg);
}

.envelope-seam-right {
	transform: rotate(-48deg);
}

.envelope-seal-button {
	position: relative;
	display: flex;
	width: 8rem;
	height: 8rem;
	align-items: center;
	justify-content: center;
	border: 1px solid color-mix(in srgb, var(--color-luxury-gold) 90%, transparent);
	border-radius: 9999px;
	background: radial-gradient(circle at 50% 30%, var(--color-luxury-cream), var(--color-luxury-gold) 70%, var(--color-luxury-bronze));
	color: var(--color-luxury-emerald);
	box-shadow: 0 0 0 8px color-mix(in srgb, var(--color-luxury-dark) 20%, transparent), 0 12px 34px color-mix(in srgb, var(--color-luxury-dark) 36%, transparent), 0 0 36px color-mix(in srgb, var(--color-luxury-gold) 40%, transparent);
	cursor: pointer;
	transition: transform 250ms ease, box-shadow 250ms ease;
}

.envelope-seal-button:hover {
	transform: scale(1.05);
	box-shadow: 0 0 0 8px color-mix(in srgb, var(--color-luxury-dark) 20%, transparent), 0 16px 42px color-mix(in srgb, var(--color-luxury-dark) 42%, transparent), 0 0 48px color-mix(in srgb, var(--color-luxury-gold) 50%, transparent);
}

.envelope-seal-ring {
	position: absolute;
	inset: 0.7rem;
	border: 1px solid color-mix(in srgb, var(--color-luxury-emerald) 38%, transparent);
	border-radius: inherit;
}

.envelope-seal-star {
	position: absolute;
	top: -1.2rem;
	font-size: 1.5rem;
	color: var(--color-luxury-cream);
}

.envelope-seal-copy {
	display: flex;
	flex-direction: column;
	align-items: center;
	line-height: 1;
	text-transform: uppercase;
}

.envelope-seal-copy span {
	margin-bottom: 0.35rem;
	font-size: 0.65rem;
	letter-spacing: 0.38em;
}

.envelope-seal-copy strong {
	font-family: var(--font-serif);
	font-size: 1.2rem;
	font-weight: 400;
	letter-spacing: 0.18em;
}

:global(html[data-theme='dark']) .envelope-fold {
	border-color: color-mix(in srgb, var(--color-luxury-gold) 42%, transparent);
	filter: drop-shadow(0 18px 24px color-mix(in srgb, var(--color-luxury-dark) 50%, transparent)) drop-shadow(0 0 2px color-mix(in srgb, var(--color-luxury-cream) 42%, transparent));
}

:global(html[data-theme='dark']) .envelope-fold::before {
	background: linear-gradient(135deg, color-mix(in srgb, var(--color-luxury-cream) 22%, transparent), transparent 32%, color-mix(in srgb, var(--color-luxury-dark) 34%, transparent) 78%);
	opacity: 0.78;
}

:global(html[data-theme='dark']) .envelope-seam {
	background: linear-gradient(transparent, color-mix(in srgb, var(--color-luxury-gold) 78%, transparent) 42%, color-mix(in srgb, var(--color-luxury-cream) 42%, transparent) 50%, color-mix(in srgb, var(--color-luxury-dark) 78%, transparent) 58%, transparent);
	box-shadow: 0 0 7px color-mix(in srgb, var(--color-luxury-gold) 42%, transparent);
}

:global(html[data-theme='light']) .envelope-gate {
	background: #efe7d8;
}

:global(html[data-theme='light']) .envelope-atmosphere {
	background:
		radial-gradient(circle at 50% 50%, rgba(183, 129, 35, 0.18), transparent 28%),
		radial-gradient(circle at 50% 10%, rgba(255, 251, 238, 0.95), transparent 56%),
		#dce8df;
}

:global(html[data-theme='light']) .envelope-top-flap {
	background: linear-gradient(154deg, #d6e3d5 0%, #f8f2e5 62%, #bdcfbf 100%);
}

:global(html[data-theme='light']) .envelope-bottom-flap {
	background: linear-gradient(28deg, #b9cfbe 0%, #e5eee2 55%, #c7d9c8 100%);
}

:global(html[data-theme='light']) .envelope-left-flap,
:global(html[data-theme='light']) .envelope-right-flap {
	background: linear-gradient(110deg, #b4cdbc 0%, #e7eee3 52%, #c1d6c3 100%);
}

:global(html[data-theme='light']) .envelope-seal-button {
	background: radial-gradient(circle at 50% 30%, #fffdf8, #dceadf 70%, #b1cbb6);
	color: #26322c;
	box-shadow: 0 0 0 8px rgba(255, 253, 248, 0.55), 0 12px 34px rgba(63, 82, 68, 0.24), 0 0 36px rgba(167, 124, 19, 0.32);
}

:global(html[data-theme='light']) .envelope-seal-ring {
	border-color: rgba(38, 50, 44, 0.32);
}

@media (max-width: 480px) {
	.envelope-botanical {
		width: 7.25rem;
		height: 12rem;
		opacity: 0.44;
	}

	.envelope-seal-button {
		width: 6.8rem;
		height: 6.8rem;
	}

	.envelope-seal-copy strong {
		font-size: 1rem;
	}
}

@media (prefers-reduced-motion: reduce) {
	.envelope-botanical {
		animation: none;
	}
}
</style>
