import { onBeforeUnmount, onMounted, ref, watch, type Ref } from 'vue'
import petalTextureUrl from '@/assets/images/petals.png'
import petalSheetUrl from '@/assets/images/petals-2.png'

export type PetalAnimationOptions = {
	petalColor?: string
	petalCount: number
	minSize: number
	maxSize: number
	minSpeed: number
	maxSpeed: number
	wind: number
	sway: number
	opacity: number
	paused: boolean
	respectReducedMotion: boolean
	maxDpr: number
}

type Petal = {
	spriteIndex: number
	x: number
	y: number
	size: number
	stretch: number
	speedX: number
	speedY: number
	angle: number
	spin: number
	sway: number
	swaySpeed: number
	phase: number
	alpha: number
	depth: number
	tumble: number
	tumbleSpeed: number
	offsetX: number
	offsetY: number
	velocityX: number
	velocityY: number
}

type AnimationCallbacks = {
	onPlay?: () => void
	onPause?: () => void
}

type AnimationTargets = {
	container: Readonly<Ref<HTMLElement | null>>
	canvas: Readonly<Ref<HTMLCanvasElement | null>>
}

const petalSprites = [
	{ textureIndex: 0, x: 0, y: 0, width: 1, height: 1 },
	{ textureIndex: 1, x: 0.57, y: 0.015, width: 0.43, height: 0.425 },
	{ textureIndex: 1, x: 0.06, y: 0.52, width: 0.45, height: 0.30 },
	{ textureIndex: 1, x: 0.63, y: 0.48, width: 0.34, height: 0.37 },
]

function random(min: number, max: number): number {
	return Math.random() * (max - min) + min
}

export function usePetalAnimation(
	options: Readonly<PetalAnimationOptions>,
	{ container, canvas }: AnimationTargets,
	callbacks: AnimationCallbacks = {},
) {
	const isPaused = ref(options.paused)
	const petals: Petal[] = []
	const petalTextures: HTMLImageElement[] = []
	const tintedTextures: HTMLCanvasElement[] = []
	const pointer = { active: false, x: 0, y: 0, velocityX: 0, velocityY: 0 }

	let ctx: CanvasRenderingContext2D | null = null
	let observer: ResizeObserver | undefined
	let mediaQuery: MediaQueryList | undefined
	let animationFrame = 0
	let lastTime = 0
	let width = 0
	let height = 0
	let destroyed = false

	const prefersReducedMotion = () =>
		options.respectReducedMotion && !!mediaQuery?.matches

	const shouldAnimate = () =>
		!destroyed && !isPaused.value && !prefersReducedMotion()

	function createPetal(randomY = false): Petal {
		const depth = random(0.45, 1)

		return {
			spriteIndex: Math.floor(random(0, petalSprites.length)),
			x: random(0, width),
			y: randomY ? random(0, height) : random(-height * 0.2, -10),
			size: random(options.minSize, options.maxSize) * depth,
			stretch: random(0.85, 1.15),
			speedX: (random(-5, 5) + options.wind) * depth,
			speedY: random(options.minSpeed, options.maxSpeed) * depth,
			angle: random(0, Math.PI * 2),
			spin: random(-0.55, 0.55),
			sway: random(options.sway * 0.4, options.sway) * depth,
			swaySpeed: random(0.4, 1.1),
			phase: random(0, Math.PI * 2),
			alpha: random(0.65, 0.95),
			depth,
			tumble: random(0, Math.PI * 2),
			tumbleSpeed: random(0.6, 1.5) * (Math.random() < 0.5 ? -1 : 1),
			offsetX: 0,
			offsetY: 0,
			velocityX: 0,
			velocityY: 0,
		}
	}

	function refreshTextures(): void {
		tintedTextures.length = 0
		if (!options.petalColor) return

		for (const [index, source] of petalTextures.entries()) {
			if (!source.naturalWidth) continue
			const tinted = document.createElement('canvas')
			tinted.width = source.naturalWidth
			tinted.height = source.naturalHeight
			const context = tinted.getContext('2d')
			if (!context) continue
			context.filter = 'grayscale(1)'
			context.drawImage(source, 0, 0)
			context.filter = 'none'
			context.globalCompositeOperation = 'multiply'
			context.fillStyle = options.petalColor
			context.fillRect(0, 0, tinted.width, tinted.height)
			context.globalCompositeOperation = 'destination-in'
			context.drawImage(source, 0, 0)
			tintedTextures[index] = tinted
		}
	}

	function drawPetal(petal: Petal): void {
		const sprite = petalSprites[petal.spriteIndex]
		const source = petalTextures[sprite.textureIndex]
		if (!ctx || !source?.naturalWidth) return
		const texture = tintedTextures[sprite.textureIndex] ?? source

		ctx.save()
		ctx.translate(petal.x + petal.offsetX, petal.y + petal.offsetY)
		ctx.rotate(petal.angle + petal.offsetX * 0.004)

		const flip = Math.cos(petal.tumble)
		ctx.scale(1, flip * petal.stretch)
		ctx.globalAlpha = Math.min(
			1,
			Math.max(0, petal.alpha * options.opacity * (0.8 + Math.abs(flip) * 0.2)),
		)

		const sourceWidth = sprite.width * source.naturalWidth
		const sourceHeight = sprite.height * source.naturalHeight
		const petalHeight = petal.size * 2 * sourceHeight / sourceWidth
		ctx.drawImage(
			texture,
			sprite.x * source.naturalWidth,
			sprite.y * source.naturalHeight,
			sourceWidth,
			sourceHeight,
			-petal.size,
			-petalHeight / 2,
			petal.size * 2,
			petalHeight,
		)
		ctx.restore()
	}

	function drawFrame(): void {
		if (!ctx) return

		ctx.clearRect(0, 0, width, height)
		for (const petal of petals) drawPetal(petal)
	}

	function resize(): void {
		if (!container.value || !canvas.value || !ctx) return

		const rect = container.value.getBoundingClientRect()
		width = rect.width
		height = rect.height
		const dpr = Math.min(window.devicePixelRatio || 1, options.maxDpr)

		canvas.value.width = Math.round(width * dpr)
		canvas.value.height = Math.round(height * dpr)
		ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
		drawFrame()
	}

	function syncPetalCount(): void {
		const count = Math.max(0, Math.floor(options.petalCount))
		while (petals.length > count) petals.pop()
		while (petals.length < count) petals.push(createPetal(true))
		drawFrame()
	}

	function resetPetals(): void {
		for (let index = 0; index < petals.length; index++) {
			petals[index] = createPetal(true)
		}
	}

	function handlePointer(event: PointerEvent): void {
		if (!event.isPrimary || !container.value || !shouldAnimate()) return
		if (event.pointerType !== 'mouse' && event.type === 'pointermove' && !pointer.active) return
		if (event.target instanceof Element && event.target.closest('.petal-animation__controls')) return

		const rect = container.value.getBoundingClientRect()
		const positionX = event.clientX - rect.left
		const positionY = event.clientY - rect.top
		if (positionX < 0 || positionX > rect.width || positionY < 0 || positionY > rect.height) {
			clearPointer()
			return
		}
		if (pointer.active) {
			pointer.velocityX = Math.max(-60, Math.min(60, (positionX - pointer.x) * 2))
			pointer.velocityY = Math.max(-60, Math.min(60, (positionY - pointer.y) * 2))
		}
		pointer.x = positionX
		pointer.y = positionY
		pointer.active = true
	}

	function clearPointer(): void {
		pointer.active = false
		pointer.velocityX = 0
		pointer.velocityY = 0
	}

	function handlePointerUp(event: PointerEvent): void {
		if (event.isPrimary && event.pointerType !== 'mouse') clearPointer()
	}

	function updateInteraction(petal: Petal, dt: number): void {
		const distanceX = petal.x + petal.offsetX - pointer.x
		const distanceY = petal.y + petal.offsetY - pointer.y
		const distance = Math.hypot(distanceX, distanceY)
		const radius = Math.max(24, petal.size * 1.5)
		const influence = pointer.active ? Math.max(0, 1 - distance / radius) ** 2 : 0
		const strength = influence * petal.depth
		const directionX = distance > 0 ? distanceX / distance : Math.cos(petal.angle)
		const directionY = distance > 0 ? distanceY / distance : Math.sin(petal.angle)
		const targetX = (directionX * 16 + pointer.velocityX * 0.15) * strength
		const targetY = (directionY * 16 + pointer.velocityY * 0.15) * strength
		const damping = Math.exp(-14 * dt)

		petal.velocityX = (petal.velocityX + (targetX - petal.offsetX) * 70 * dt) * damping
		petal.velocityY = (petal.velocityY + (targetY - petal.offsetY) * 70 * dt) * damping
		petal.offsetX += petal.velocityX * dt
		petal.offsetY += petal.velocityY * dt
	}

	function update(dt: number): void {
		const pointerDecay = Math.exp(-8 * dt)
		pointer.velocityX *= pointerDecay
		pointer.velocityY *= pointerDecay
		for (const petal of petals) {
			updateInteraction(petal, dt)
			petal.phase += petal.swaySpeed * dt
			petal.y += petal.speedY * (1 + Math.sin(petal.tumble) * 0.18) * dt
			petal.x += (
				petal.speedX + Math.sin(petal.phase) * petal.sway
				+ Math.sin(petal.phase * 0.37) * 6 * petal.depth
			) * dt
			petal.angle += petal.spin * dt
			petal.tumble += petal.tumbleSpeed * dt

			if (petal.x < -40) petal.x = width + 30
			if (petal.x > width + 40) petal.x = -30

			if (petal.y > height + 35) {
				Object.assign(petal, createPetal())
				petal.x = random(0, width)
			}
		}
	}

	function tick(timestamp: number): void {
		animationFrame = 0
		if (!shouldAnimate()) {
			lastTime = 0
			drawFrame()
			return
		}

		const dt = lastTime ? Math.min((timestamp - lastTime) / 1000, 0.05) : 0
		lastTime = timestamp
		update(dt)
		drawFrame()
		animationFrame = requestAnimationFrame(tick)
	}

	function startLoop(): void {
		if (destroyed || animationFrame || !shouldAnimate()) {
			drawFrame()
			return
		}

		lastTime = 0
		animationFrame = requestAnimationFrame(tick)
	}

	function stopLoop(): void {
		if (animationFrame) {
			cancelAnimationFrame(animationFrame)
			animationFrame = 0
		}
		lastTime = 0
		drawFrame()
	}

	function play(): void {
		if (!isPaused.value) return
		isPaused.value = false
		callbacks.onPlay?.()
		startLoop()
	}

	function pause(): void {
		if (isPaused.value) return
		isPaused.value = true
		clearPointer()
		stopLoop()
		callbacks.onPause?.()
	}

	function restart(): void {
		clearPointer()
		resetPetals()
		lastTime = 0
		if (shouldAnimate()) startLoop()
		else drawFrame()
	}

	function handleVisibilityChange(): void {
		if (document.hidden) {
			clearPointer()
			stopLoop()
		}
		else startLoop()
	}

	function handleMotionChange(): void {
		clearPointer()
		if (shouldAnimate()) startLoop()
		else stopLoop()
	}

	watch(() => options.paused, value => {
		if (value) pause()
		else play()
	})
	watch(() => options.petalCount, syncPetalCount)
	watch(
		() => [options.minSize, options.maxSize, options.minSpeed, options.maxSpeed, options.wind, options.sway],
		() => {
			resetPetals()
			drawFrame()
		},
	)
	watch(() => options.opacity, drawFrame)
	watch(() => options.petalColor, () => {
		refreshTextures()
		drawFrame()
	})

	onMounted(() => {
		if (!canvas.value || !container.value) return
		ctx = canvas.value.getContext('2d', { alpha: true })
		if (!ctx) return

		destroyed = false
		for (const textureUrl of [petalTextureUrl, petalSheetUrl]) {
			const texture = new Image()
			texture.onload = () => {
				if (!destroyed) {
					refreshTextures()
					drawFrame()
				}
			}
			petalTextures.push(texture)
			texture.src = textureUrl
		}

		mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
		mediaQuery.addEventListener('change', handleMotionChange)
		document.addEventListener('visibilitychange', handleVisibilityChange)
		observer = new ResizeObserver(resize)
		observer.observe(container.value)
		document.addEventListener('pointerdown', handlePointer, { passive: true, capture: true })
		document.addEventListener('pointermove', handlePointer, { passive: true, capture: true })
		document.addEventListener('pointerup', handlePointerUp, { passive: true, capture: true })
		document.addEventListene