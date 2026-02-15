export interface SpeakerSession {
  id: number
  name: string
}

export interface Speaker {
  id: string
  name: string
  firstName: string
  lastName: string
  fullName: string
  bio: string
  tagLine: string
  profilePicture: string | null
  isTopSpeaker: boolean
  sessions: SpeakerSession[]
}

export interface QuestionAnswer {
  id: number
  answer: string
}

export interface Session {
  id: string
  name: string
  title: string
  description: string
  startsAt: string
  endsAt: string
  isServiceSession: boolean
  isPlenumSession: boolean
  speakers: Speaker[]
  roomId: number
  room: string
  questionAnswers: QuestionAnswer[]
  recordingUrl: string
  slideDeck: string
  video: string
  rate: string
}

export interface Room {
  id: number
  name: string
  sessions: Session[]
  session: Session
}

export interface TimeSlot {
  slotStart: string
  rooms: Room[]
}

export interface GridEntry {
  date: string
  rooms: Room[]
  timeSlots: TimeSlot[]
}

export interface SessionList {
  sessions: Session[]
}
