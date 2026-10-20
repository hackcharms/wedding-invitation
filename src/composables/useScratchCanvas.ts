import { onBeforeUnmount, ref } from 'vue'
import type { ScratchOptions } from '@/types/wedding'

export function useScratchCanvas(options: ScratchOptions = {}) {
  const { thresholdPercent = 45, onThresholdReached } = options
  
  const scratchPercentage = ref<number>(0)
  const isFullyRevealed = ref<boolean>(false)
  let ctx: CanvasRenderingContext2D | null = null
  let progressContext: CanvasRenderingContext2D | null = null
  let isDrawing = false
  let lastX = 0
  let lastY = 0
  let themeObserver: MutationObserver | undefined
  let resizeObserver: ResizeObserver | undefined
  let progressTimer: ReturnType<typeof setTimeout> | undefined

  const updateProgress = (): void => {
    if (progressTimer !== undefined) clearTimeout(progressTimer)
    progressTimer = undefined
    if (!ctx || !progressContext || isFullyRevealed.value) return

    const sampleCanvas = progressContext.canvas
    progressContext.clearRect(0, 0, sampleCanvas.width, sampleCanvas.height)
    progressContext.drawImage(ctx.canvas, 0, 0, sampleCanvas.width, sampleCanvas.height)
    const pixels = progressContext.getImageData(0, 0, sampleCanvas.width, sampleCanvas.height).data
    let cleared = 0
    let sampled = 0
    for (let index = 3; index < pixels.length; index += 4) {
      cleared += 1 - pixels[index]! / 255
      sampled++
    }

    const currentPercent = sampled ? (cleared / sampled) * 100 : 0
    scratchPercentage.value = Math.round(currentPercent)

    if (currentPercent >= thresholdPercent) {
      isFullyRevealed.value = true
      onThresholdReached?.()
    }
  }

  const paintCoating = (preserveScratches = false): void => {
    if (!ctx) return

    const canvasElement = ctx.canvas
    const mask = preserveScratches ? document.createElement('canvas') : null
    if (mask) {
      mask.width = canvasElement.width
      mask.height = canvasElement.height
      const maskContext = mask.getContext('2d')
      if (!maskContext) return
      maskContext.drawImage(canvasElement, 0, 0)
    }

    const styles = getComputedStyle(document.documentElement)
    const color = (property: string, fallback: string): string => styles.getPropertyValue(property).trim() || fallback

    ctx.save()
    ctx.globalCompositeOperation = 'source-over'
    ctx.clearRect(0, 0, canvasElement.width, canvasElement.height)
    const gradient = ctx.createLinearGradient(0, 0, canvasElement.width, canvasElement.height)
    gradient.addColorStop(0, color('--color-theme-gold-light', '#E7C75A'))
    gradient.addColorStop(0.5, color('--color-luxury-gold', '#D4AF37'))
    gradient.addColorStop(1, color('--color-luxury-bronze', '#AA771C'))
    
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvasElement.width, canvasElement.height)
    ctx.fillStyle = 'rgba(0, 0, 0, 0.15)'
    ctx.fillRect(0, 0, canvasElement.width, canvasElement.height)
    
    ctx.fillStyle = color('--color-luxury-dark', '#111827')
    ctx.font = 'bold 16px sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('✨ SCRATCH TO REVEAL DATE ✨', canvasElement.width / 2, canvasElement.height / 2)
    if (mask) {
      ctx.globalCompositeOperation = 'destination-in'
      ctx.drawImage(mask, 0, 0)
    }
    ctx.restore()
  }

  const initCanvas = (canvasElement: HTMLCanvasElement, containerElement: HTMLElement): void => {
    ctx = canvasElement.getContext('2d')
    if (!ctx) return

    const sampleCanvas = document.createElement('canvas')
    progressContext = sampleCanvas.getContext('2d', { willReadFrequently: true })
    let initialized = false
    const resizeCanvas = (): void => {
      if (!ctx) return
      const rect = containerElement.getBoundingClientRect()
      const width = Math.max(1, Math.round(rect.width))
      const height = Math.max(1, Math.round(rect.height))
      if (initialized && canvasElement.width === width && canvasElement.height === height) return

      stopScratching()
      const coating = initialized ? document.createElement('canvas') : null
      if (coating) {
        coating.width = canvasElement.width
        coating.height = canvasElement.height
        coating.getContext('2d')?.drawImage(canvasElement, 0, 0)
      }
      canvasElement.width = width
      canvasElement.height = height
      if (coating) ctx.drawImage(coating, 0, 0, width, height)
      const sampleScale = Math.min(1, 96 / Math.max(width, height))
      sampleCanvas.width = Math.max(1, Math.round(width * sampleScale))
      sampleCanvas.height = Math.max(1, Math.round(height * sampleScale))
      paintCoating(!!coating)
      initialized = true
    }
    resizeCanvas()
    resizeObserver?.disconnect()
    resizeObserver = new ResizeObserver(resizeCanvas)
    resizeObserver.observe(containerElement)

    themeObserver?.disconnect()
    themeObserver = new MutationObserver(() => {
      if (!isFullyRevealed.value) paintCoating(true)
    })
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme', 'data-palette', 'style'],
    })
  }

  const startScratching = (e: PointerEvent, canvasElement: HTMLCanvasElement): void => {
    isDrawing = true
    const rect = canvasElement.getBoundingClientRect()
    lastX = e.clientX - rect.left
    lastY = e.clientY - rect.top
  }

  const scratch = (e: PointerEvent, canvasElement: HTMLCanvasElement): void => {
    if (!isDrawing || isFullyRevealed.value || !ctx) return
    const rect = canvasElement.getBoundingClientRect()
    const currentX = e.clientX - rect.left
    const currentY = e.clientY - rect.top

    ctx.save()
    ctx.globalCompositeOperation = 'destination-out'
    ctx.strokeStyle = '#000000'
    ctx.lineJoin = 'round'
    ctx.lineCap = 'round'
    ctx.lineWidth = 36

    ctx.beginPath()
    ctx.moveTo(lastX, lastY)
    ctx.lineTo(currentX, currentY)
    ctx.stroke()
    ctx.restore()

    lastX = currentX
    lastY = currentY

    if (progressTimer === undefined) {
      progressTimer = setTimeout(updateProgress, 150)
    }
  }

  const stopScratching = (): void => {
    isDrawing = false
    if (progressTimer !== undefined) updateProgress()
  }

  onBeforeUnmount(() => {
    if (progressTimer !== undefined) clearTimeout(progressTimer)
    themeObserver?.disconnect()
    resizeObserver?.disconnect()
    progressContext = null
    ctx = null
  })

  return {
    scratchPercentage,
    isFullyRevealed,
    initCanvas,
    startScratching,
    scratch,
    stopScratching
  }
}