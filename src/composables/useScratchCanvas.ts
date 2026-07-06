import { ref } from 'vue'
import type { ScratchOptions } from '@/types/wedding'

export function useScratchCanvas(options: ScratchOptions = {}) {
  const { thresholdPercent = 45, onThresholdReached } = options
  
  const scratchPercentage = ref<number>(0)
  const isFullyRevealed = ref<boolean>(false)
  let ctx: CanvasRenderingContext2D | null = null
  let isDrawing = false
  let lastX = 0
  let lastY = 0

  const initCanvas = (canvasElement: HTMLCanvasElement, containerElement: HTMLElement): void => {
    ctx = canvasElement.getContext('2d', { willReadFrequently: true })
    if (!ctx) return

    const rect = containerElement.getBoundingClientRect()
    canvasElement.width = rect.width
    canvasElement.height = rect.height
    
    const gradient = ctx.createLinearGradient(0, 0, canvasElement.width, canvasElement.height)
    gradient.addColorStop(0, '#D4AF37')
    gradient.addColorStop(0.5, '#AA771C')
    gradient.addColorStop(1, '#8B6508')
    
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvasElement.width, canvasElement.height)
    
    ctx.fillStyle = '#111827'
    ctx.font = 'bold 12px sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('✨ SCRATCH TO REVEAL DATE ✨', canvasElement.width / 2, canvasElement.height / 2)
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

  return {
    scratchPercentage,
    isFullyRevealed,
    initCanvas,
    startScratching,
    scratch,
    stopScratching
  }
}