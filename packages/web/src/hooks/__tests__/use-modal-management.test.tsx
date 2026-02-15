import { renderHook, act } from "@testing-library/react"
import { useModalManagement } from "../use-modal-management"
import { type Session, type Speaker } from "../use-sessionize"

// Mock window.history
const mockPushState = jest.fn()
Object.defineProperty(window, "history", {
  value: {
    pushState: mockPushState,
  },
  writable: true,
})

// Mock session and speaker data
const mockSession: Session = {
  id: "session-1",
  name: "Test Session",
  title: "Test Session",
  description: "Test Description",
  startsAt: "2024-03-20T14:00:00Z",
  endsAt: "2024-03-20T15:00:00Z",
  isServiceSession: false,
  isPlenumSession: false,
  speakers: [],
  roomId: 1,
  room: "Room A",
  questionAnswers: [],
  recordingUrl: "https://example.com/recording",
  slideDeck: "",
  video: "",
  rate: "",
}

const mockSpeaker: Speaker = {
  id: "speaker-1",
  name: "John Doe",
  firstName: "John",
  lastName: "Doe",
  fullName: "John Doe",
  bio: "Test bio",
  tagLine: "Test tagline",
  profilePicture: "https://example.com/photo.jpg",
  isTopSpeaker: false,
  sessions: [],
}

describe("useModalManagement", () => {
  beforeEach(() => {
    mockPushState.mockClear()
  })

  describe("initialization", () => {
    it("should initialize with no selected session or speaker", () => {
      const { result } = renderHook(() => useModalManagement())

      expect(result.current.selectedSession).toBeNull()
      expect(result.current.selectedSpeaker).toBeNull()
    })

    it("should accept initial props", () => {
      const mockOnSessionSelect = jest.fn()
      const { result } = renderHook(() =>
        useModalManagement({
          schedule: [],
          onSessionSelect: mockOnSessionSelect,
        })
      )

      expect(result.current.selectedSession).toBeNull()
      expect(result.current.selectedSpeaker).toBeNull()
    })
  })

  describe("handleSessionClick", () => {
    it("should set selected session when valid session is clicked", () => {
      const { result } = renderHook(() => useModalManagement())

      act(() => {
        result.current.handleSessionClick(mockSession)
      })

      expect(result.current.selectedSession).toBe(mockSession)
    })

    it("should update browser history when session is selected", () => {
      const { result } = renderHook(() => useModalManagement())

      act(() => {
        result.current.handleSessionClick(mockSession)
      })

      expect(mockPushState).toHaveBeenCalledWith(null, "", "#session-1")
    })

    it("should call onSessionSelect callback when provided", () => {
      const mockOnSessionSelect = jest.fn()
      const { result } = renderHook(() =>
        useModalManagement({ onSessionSelect: mockOnSessionSelect })
      )

      act(() => {
        result.current.handleSessionClick(mockSession)
      })

      expect(mockOnSessionSelect).toHaveBeenCalledWith(mockSession)
    })

    it("should not set session when session has no id", () => {
      const sessionWithoutId = { ...mockSession, id: "" }
      const { result } = renderHook(() => useModalManagement())

      act(() => {
        result.current.handleSessionClick(sessionWithoutId)
      })

      expect(result.current.selectedSession).toBeNull()
      expect(mockPushState).not.toHaveBeenCalled()
    })

    it("should handle null session gracefully", () => {
      const { result } = renderHook(() => useModalManagement())

      act(() => {
        result.current.handleSessionClick(null as unknown as Session)
      })

      expect(result.current.selectedSession).toBeNull()
      expect(mockPushState).not.toHaveBeenCalled()
    })
  })

  describe("handleSpeakerClick", () => {
    it("should set selected speaker when speaker is clicked", () => {
      const { result } = renderHook(() => useModalManagement())

      act(() => {
        result.current.handleSpeakerClick(mockSpeaker)
      })

      expect(result.current.selectedSpeaker).toBe(mockSpeaker)
    })

    it("should handle multiple speaker selections", () => {
      const secondSpeaker = {
        ...mockSpeaker,
        id: "speaker-2",
        fullName: "Jane Smith",
      }
      const { result } = renderHook(() => useModalManagement())

      act(() => {
        result.current.handleSpeakerClick(mockSpeaker)
      })
      expect(result.current.selectedSpeaker).toBe(mockSpeaker)

      act(() => {
        result.current.handleSpeakerClick(secondSpeaker)
      })
      expect(result.current.selectedSpeaker).toBe(secondSpeaker)
    })
  })

  describe("modal closing", () => {
    it("should close session modal", () => {
      const { result } = renderHook(() => useModalManagement())

      // First select a session
      act(() => {
        result.current.handleSessionClick(mockSession)
      })
      expect(result.current.selectedSession).toBe(mockSession)

      // Then close the modal
      act(() => {
        result.current.handleCloseSessionModal()
      })
      expect(result.current.selectedSession).toBeNull()
    })

    it("should close speaker modal", () => {
      const { result } = renderHook(() => useModalManagement())

      // First select a speaker
      act(() => {
        result.current.handleSpeakerClick(mockSpeaker)
      })
      expect(result.current.selectedSpeaker).toBe(mockSpeaker)

      // Then close the modal
      act(() => {
        result.current.handleCloseSpeakerModal()
      })
      expect(result.current.selectedSpeaker).toBeNull()
    })
  })

  describe("integration scenarios", () => {
    it("should handle both session and speaker modals independently", () => {
      const { result } = renderHook(() => useModalManagement())

      // Select both session and speaker
      act(() => {
        result.current.handleSessionClick(mockSession)
        result.current.handleSpeakerClick(mockSpeaker)
      })

      expect(result.current.selectedSession).toBe(mockSession)
      expect(result.current.selectedSpeaker).toBe(mockSpeaker)

      // Close only session modal
      act(() => {
        result.current.handleCloseSessionModal()
      })

      expect(result.current.selectedSession).toBeNull()
      expect(result.current.selectedSpeaker).toBe(mockSpeaker)

      // Close speaker modal
      act(() => {
        result.current.handleCloseSpeakerModal()
      })

      expect(result.current.selectedSpeaker).toBeNull()
    })
  })
})
