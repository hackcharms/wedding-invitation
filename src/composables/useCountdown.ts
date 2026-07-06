import { reactive, onMounted, onUnmounted } from 'vue'
import type { TimeRemaining } from '@/types/wedding'

export function useCountdown(targetIsoDateString: string) {
  const targetDate = new Date(targetIsoDateString).getTime()
  const timeRemaining = reactive<TimeRemaining>({ 
    days: 0, 
    hours: 0, 
    minutes: 0, 
    seconds: 0, 
    isExpired: false 
  })
  
  let timerId: ReturnType<typeof setInterval> | null = null

  const calculate = (): void => {
    const difference = targetDate - Date.now()
    
    if (difference <= 0) {
      timeRemaining.isExpired = true
      if (timerId) clearInterval(timerId)
      return
    }

    timeRemaining.days = Math.floor(difference / (1000 * 60 * 60 * 24))
    timeRemaining.hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    timeRemaining.minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
    timeRemaining.seconds = Math.floor((difference % (1000 * 60)) / 1000)
  }

  onMounted(() => {
    calculate()
    timerId = setInterval(calculate, 1000)
  })

  onUnmounted(() => {
    if (timerId) clearInterval(timerId)
  })

  return { timeRemaining }
}