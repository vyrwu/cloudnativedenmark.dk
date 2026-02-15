// Re-export from shared package for backwards compatibility
export {
  useSessionizeSpeakers,
  useSessionizeSchedule,
  MainSessionizeId,
  getAllSessions,
  getSessionById,
  getSpeakerSessionIds,
} from '@cloudnative/shared'

export type {
  Speaker,
  SpeakerSession,
  Session,
  QuestionAnswer,
  GridEntry,
  Room,
  TimeSlot,
  SessionList,
} from '@cloudnative/shared'
