import Labels from '@/config/labels.json'

export type WeddingDateFormat = 'longDate' | 'monthDay' | 'time' | 'calendarStart' | 'calendarEnd'

const eventDate = new Date(Labels.eventDateTimeUtc)
const eventEndDate = new Date(eventDate.getTime() + 5.5 * 60 * 60 * 1000)

function formatCalendarUtcDate(date: Date): string {
  return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
}

export function formatWeddingDate(format: WeddingDateFormat): string {
  if (format === 'calendarStart') return formatCalendarUtcDate(eventDate)
  if (format === 'calendarEnd') return formatCalendarUtcDate(eventEndDate)

  const options: Intl.DateTimeFormatOptions = {
    timeZone: Labels.eventTimeZone,
  }

  if (format === 'longDate') {
    Object.assign(options, { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })
  } else if (format === 'monthDay') {
    Object.assign(options, { month: 'long', day: 'numeric' })
  } else {
    Object.assign(options, { hour: 'numeric', minute: '2-digit', hour12: true })
  }

  return new Intl.DateTimeFormat('en-US', options).format(eventDate)
}