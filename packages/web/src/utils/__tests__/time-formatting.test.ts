import {
  formatTime,
  formatTimeDetailed,
  formatDate,
  formatDateTimeDetailed,
  calculateSessionDuration,
} from "../time-formatting"

describe("time-formatting utilities", () => {
  describe("formatTime", () => {
    it("should remove seconds from time string", () => {
      expect(formatTime("14:30:00")).toBe("14:30")
      expect(formatTime("09:15:45")).toBe("09:15")
      expect(formatTime("23:59:59")).toBe("23:59")
    })

    it("should handle time strings without seconds", () => {
      expect(formatTime("14:30")).toBe("14")
    })

    it("should handle empty string", () => {
      expect(formatTime("")).toBe("")
    })
  })

  describe("formatTimeDetailed", () => {
    it("should format ISO datetime string to 24-hour time", () => {
      const testDate = "2024-03-20T14:30:00Z"
      const result = formatTimeDetailed(testDate)
      expect(result).toMatch(/^\d{2}:\d{2}$/) // Should match HH:MM format
    })

    it("should handle different timezones consistently", () => {
      const testDate = "2024-03-20T14:30:00"
      const result = formatTimeDetailed(testDate)
      expect(result).toMatch(/^\d{2}:\d{2}$/)
    })
  })

  describe("formatDate", () => {
    it("should format date string to readable format", () => {
      const testDate = "2024-03-20T14:30:00Z"
      const result = formatDate(testDate)
      expect(result).toContain("Wednesday")
      expect(result).toContain("March")
      expect(result).toContain("20")
    })

    it("should handle different date formats", () => {
      const testDate = "2024-12-25"
      const result = formatDate(testDate)
      expect(result).toContain("December")
      expect(result).toContain("25")
    })
  })

  describe("formatDateTimeDetailed", () => {
    it("should format full datetime with year", () => {
      const testDate = "2024-03-20T14:30:00Z"
      const result = formatDateTimeDetailed(testDate)
      expect(result).toContain("2024")
      expect(result).toContain("March")
      expect(result).toContain("20")
      expect(result).toMatch(/\d{2}:\d{2}/) // Should contain time
    })

    it("should include all required components", () => {
      const testDate = "2024-06-15T09:45:00Z"
      const result = formatDateTimeDetailed(testDate)
      expect(result).toContain("June")
      expect(result).toContain("15")
      expect(result).toContain("2024")
    })
  })

  describe("calculateSessionDuration", () => {
    it("should calculate duration in minutes correctly", () => {
      const start = "2024-03-20T14:00:00Z"
      const end = "2024-03-20T15:30:00Z"
      const duration = calculateSessionDuration(start, end)
      expect(duration).toBe(90) // 1.5 hours = 90 minutes
    })

    it("should handle same day time calculations", () => {
      const start = "2024-03-20T09:00:00Z"
      const end = "2024-03-20T09:45:00Z"
      const duration = calculateSessionDuration(start, end)
      expect(duration).toBe(45)
    })

    it("should handle cross-day calculations", () => {
      const start = "2024-03-20T23:30:00Z"
      const end = "2024-03-21T01:00:00Z"
      const duration = calculateSessionDuration(start, end)
      expect(duration).toBe(90)
    })

    it("should return 0 for same start and end time", () => {
      const time = "2024-03-20T14:00:00Z"
      const duration = calculateSessionDuration(time, time)
      expect(duration).toBe(0)
    })

    it("should handle negative duration (end before start)", () => {
      const start = "2024-03-20T15:00:00Z"
      const end = "2024-03-20T14:00:00Z"
      const duration = calculateSessionDuration(start, end)
      expect(duration).toBe(-60)
    })

    it("should handle fractional minutes", () => {
      const start = "2024-03-20T14:00:00Z"
      const end = "2024-03-20T14:15:30Z"
      const duration = calculateSessionDuration(start, end)
      expect(duration).toBe(15.5)
    })
  })
})
