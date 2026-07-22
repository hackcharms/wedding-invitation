export interface TimeRemaining {
  days: number
  hours: number
  minutes: number
  seconds: number
  isExpired: boolean
}

export interface TimelineEvent {
  time: string
  title: string
  description: string
  icon: string
}

export interface RSVPPayload {
  name: string
  email: string
  attendance: 'accept' | 'decline' | ''
  totalGuests: string
  dietaryPreference: 'veg' | 'non-veg' | 'both' | ''
  prayers: string
}

export interface ScratchOptions {
  thresholdPercent?: number
  onThresholdReached?: () => void
}