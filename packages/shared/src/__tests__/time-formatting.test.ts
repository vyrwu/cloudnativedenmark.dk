import {
  formatTime,
  formatTimeDetailed,
  formatDate,
  formatDateTimeDetailed,
  calculateSessionDuration,
  hasSessionStarted,
  hasSessionEnded,
  formatRelativeTime,
} from '../utils/time-formatting'

describe('time-formatting utilities', () => {
  describe('formatTime', () => {
    it('should remove seconds from time string', () => {
      expect(formatTime('14:30:00')).toBe('14:30')
      expect(formatTime('09:00:00')).toBe('09:00')
    })

    it('should handle time without seconds', () => {
      expect(formatTime('14:30')).toBe('14')
    })
  })

  describe('formatTimeDetailed', () => {
    it('should format ISO timestamp to HH:MM', () => {
      const result = formatTimeDetailed('2024-06-15T14:30:00Z')
      expect(result).toMatch(/\d{2}:\d{2}/)
    })
  })

  describe('formatDate', () => {
    it('should format date with weekday, month, and day', () => {
      const result = formatDate('2024-06-15T14:30:00Z')
      expect(result).toContain('June')
      expect(result).toContain('15')
    })
  })

  describe('formatDateTimeDetailed', () => {
    it('should format date and time together', () => {
      const result = formatDateTimeDetailed('2024-06-15T14:30:00Z')
      expect(result).toContain('2024')
      expect(result).toContain('June')
    })
  })

  describe('calculateSessionDuration', () => {
    it('should calculate duration in minutes', () => {
      const startsAt = '2024-06-15T14:00:00Z'
      const endsAt = '2024-06-15T15:30:00Z'
      expect(calculateSessionDuration(startsAt, endsAt)).toBe(90)
    })

    it('should handle 30 minute sessions', () => {
      const startsAt = '2024-06-15T14:00:00Z'
      const endsAt = '2024-06-15T14:30:00Z'
      expect(calculateSessionDuration(startsAt, endsAt)).toBe(30)
    })
  })

  describe('hasSessionStarted', () => {
    it('should return true for past dates', () => {
      const pastDate = '2020-01-01T00:00:00Z'
      expect(hasSessionStarted(pastDate)).toBe(true)
    })

    it('should return false for future dates', () => {
      const futureDate = '2099-12-31T23:59:59Z'
      expect(hasSessionStarted(futureDate)).toBe(false)
    })
  })

  describe('hasSessionEnded', () => {
    it('should return true for past dates', () => {
      const pastDate = '2020-01-01T00:00:00Z'
      expect(hasSessionEnded(pastDate)).toBe(true)
    })

    it('should return false for future dates', () => {
      const futureDate = '2099-12-31T23:59:59Z'
      expect(hasSessionEnded(futureDate)).toBe(false)
    })
  })

  describe('formatRelativeTime', () => {
    it('should return "just now" for very recent times', () => {
      const now = new Date()
      expect(formatRelativeTime(now)).toBe('just now')
    })

    it('should return minutes ago for recent times', () => {
      const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000)
      expect(formatRelativeTime(fiveMinutesAgo)).toBe('5m ago')
    })

    it('should return hours ago for older times', () => {
      const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000)
      expect(formatRelativeTime(twoHoursAgo)).toBe('2h ago')
    })

    it('should return days ago for even older times', () => {
      const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
      expect(formatRelativeTime(threeDaysAgo)).toBe('3d ago')
    })

    it('should return formatted date for very old times', () => {
      const oldDate = new Date('2020-01-01')
      const result = formatRelativeTime(oldDate)
      expect(result).toContain('2020')
    })
  })
})
