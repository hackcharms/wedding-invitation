import { onBeforeUnmount, ref } from 'vue'
import type { ScratchOptions } from '@/types/wedding'

export function useScratchCanvas(options: ScratchOptions = {}) {
  const { thresholdPercent = 45, onThresholdReached } = options
  
  const scratchPercentage = ref<number>(0)
  const isFullyRevealed = ref<boolean>(false)
  let ctx: CanvasRenderingContext2D | null = null
  let isDrawing = false
  let lastX = 0
  let lastY = 0
  let themeObserver: MutationObserver | undefined

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
    ctx = canvasElement.getContext('2d', { willReadFrequently: true })
    if (!ctx) return

    const rect = containerElement.getBoundingClientRect()
    canvasElement.width = rect.width
    canvasElement.height = rect.height
    paintCoating()

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

    ctx.globalCompositeOperation = 'destination-out'
    ctx.lineJoin = 'round'
    ctx.lineCap = 'round'
    ctx.lineWidth = 36

    ctx.beginPath()
    ctx.moveTo(lastX, lastY)
    ctx.lineTo(currentX, currentY)
    ctx.stroke()

    lastX = currentX
    lastY = currentY

    // Performance-optimized sampling calculation
    const imgData = ctx.getImageData(0, 0, canvasElement.width, canvasElement.height)
    const pixels = imgData.data
    let cleared = 0
    for (let i = 3; i < pixels.length; i += 16) {
      if (pixels[i] === 0) cleared++
    }

    const currentPercent = (cleared / (pixels.length / 16)) * 100
    scratchPercentage.value = Math.round(currentPercent)

    if (currentPercent >= thresholdPercent) {
      isFullyRevealed.value = true
      if (onThresholdReached) onThresholdReached()
    }
  }

  const stopScratching = (): void => { isDrawing = false }

  onBeforeUnmount(() => {
    themeObserver?.disconnect()
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