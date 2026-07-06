export interface CalendarEventData {
  title: string
  description: string
  location: string
  startDate: string // Format: YYYYMMDDTHHMMSS (UTC or Local)
  endDate: string
}

export function generateGoogleCalendarUrl(event: CalendarEventData): string {
  const base = 'https://calendar.google.com/calendar/render?action=TEMPLATE'
  return `${base}&text=${encodeURIComponent(event.title)}&dates=${event.startDate}/${event.endDate}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`
}

export function generateIcalDataUrl(event: CalendarEventData): string {
  const icalText = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'BEGIN:VEVENT',
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${event.description}`,
    `LOCATION:${event.location}`,
    `DTSTART:${event.startDate}`,
    `DTEND:${event.endDate}`,
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\n')

  return `data:text/calendar;charset=utf-8 Hoy,${encodeURIComponent(icalText)}`
}