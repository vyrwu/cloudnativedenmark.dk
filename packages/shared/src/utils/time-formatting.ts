export const formatTime = (timeString: string): string => {
  return timeString.substring(0, timeString.lastIndexOf(':'))
}

export const formatTimeDetailed = (timeString: string): string => {
  return new Date(timeString).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })
}

export const formatDateTimeDetailed = (dateString: string): string => {
  return new Date(dateString).toLocaleString([], {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export const calculateSessionDuration = (
  startsAt: string,
  endsAt: string
): number => {
  const starts = new Date(startsAt)
  const ends = new Date(endsAt)
  return (ends.getTime() - starts.getTime()) / (1000 * 60) // duration in minutes
}

export const hasSessionStarted = (startsAt: string): boolean => {
  return new Date(startsAt) <= new Date()
}

export const hasSessionEnded = (endsAt: string): boolean => {
  return new Date(endsAt) <= new Date()
}

export const formatRelativeTime = (date: Date): string => {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / (1000 * 60))
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffMins < 1) return 'just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`
  return date.toLocaleDateString()
}
