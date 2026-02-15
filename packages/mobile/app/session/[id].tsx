import React, { useEffect, useState, useCallback } from 'react'
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Alert,
} from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import {
  theme,
  useSessionizeSchedule,
  getSessionById,
  formatTimeDetailed,
  formatDate,
  hasSessionStarted,
} from '@cloudnative/shared'
import type { Rating, StarRating as StarRatingType } from '@cloudnative/shared'
import { useAuth } from '../../contexts/AuthContext'
import { RatingForm, LoadingScreen } from '../../components'
import {
  createRating,
  updateRating,
  getUserRatingForSession,
} from '../../services/ratings'

export default function SessionDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const router = useRouter()
  const { user } = useAuth()
  const { schedule, loading } = useSessionizeSchedule()
  const [existingRating, setExistingRating] = useState<Rating | null>(null)
  const [loadingRating, setLoadingRating] = useState(true)

  const session = id ? getSessionById(schedule, id) : undefined
  const canRate = session ? hasSessionStarted(session.startsAt) : false

  const loadExistingRating = useCallback(async () => {
    if (!user || !id) return
    try {
      const rating = await getUserRatingForSession(user.uid, id)
      setExistingRating(rating)
    } catch (err) {
      console.error('Failed to load existing rating:', err)
    } finally {
      setLoadingRating(false)
    }
  }, [user, id])

  useEffect(() => {
    loadExistingRating()
  }, [loadExistingRating])

  const handleSubmitRating = async (stars: StarRatingType, comment: string) => {
    if (!user || !id) return

    try {
      if (existingRating) {
        await updateRating(existingRating.id, user.uid, { stars, comment })
        Alert.alert('Success', 'Your rating has been updated', [
          { text: 'OK', onPress: () => router.back() },
        ])
      } else {
        await createRating(user.uid, { sessionId: id, stars, comment })
        Alert.alert('Success', 'Thank you for your feedback!', [
          { text: 'OK', onPress: () => router.back() },
        ])
      }
    } catch (err) {
      throw err
    }
  }

  if (loading || loadingRating) {
    return <LoadingScreen />
  }

  if (!session) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Session not found</Text>
      </View>
    )
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View style={styles.roomBadge}>
          <Text style={styles.roomText}>{session.room}</Text>
        </View>
        <Text style={styles.title}>{session.title || session.name}</Text>
        <Text style={styles.time}>
          {formatDate(session.startsAt)} {'\u2022'}{' '}
          {formatTimeDetailed(session.startsAt)} -{' '}
          {formatTimeDetailed(session.endsAt)}
        </Text>
      </View>

      {session.speakers && session.speakers.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Speakers</Text>
          {session.speakers.map((speaker) => (
            <View key={speaker.id} style={styles.speakerCard}>
              {speaker.profilePicture && (
                <Image
                  source={{ uri: speaker.profilePicture }}
                  style={styles.speakerImage}
                />
              )}
              <View style={styles.speakerInfo}>
                <Text style={styles.speakerName}>
                  {speaker.fullName || speaker.name}
                </Text>
                {speaker.tagLine && (
                  <Text style={styles.speakerTagline}>{speaker.tagLine}</Text>
                )}
              </View>
            </View>
          ))}
        </View>
      )}

      {session.description && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{session.description}</Text>
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          {existingRating ? 'Update Your Rating' : 'Rate This Session'}
        </Text>

        {!canRate ? (
          <View style={styles.lockedContainer}>
            <Text style={styles.lockedText}>
              Rating will be available once the session starts
            </Text>
          </View>
        ) : (
          <RatingForm
            initialStars={existingRating?.stars}
            initialComment={existingRating?.comment}
            onSubmit={handleSubmitRating}
            submitLabel={existingRating ? 'Update Rating' : 'Submit Rating'}
          />
        )}

        {existingRating && (
          <View style={styles.existingRatingInfo}>
            <Text style={styles.existingRatingText}>
              You rated this session on{' '}
              {existingRating.createdAt.toLocaleDateString()}
            </Text>
            <Text style={styles.statusText}>
              Status:{' '}
              <Text style={styles.statusValue}>{existingRating.status}</Text>
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.gray[50],
  },
  content: {
    padding: theme.spacing.md,
  },
  header: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  roomBadge: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.backgroundLight,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.sm,
    marginBottom: theme.spacing.sm,
  },
  roomText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.primary,
    fontWeight: '600',
  },
  title: {
    fontSize: theme.fontSize.xxl,
    fontWeight: '700',
    color: theme.colors.primary,
    marginBottom: theme.spacing.sm,
  },
  time: {
    fontSize: theme.fontSize.md,
    color: theme.colors.gray[500],
  },
  section: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: '600',
    color: theme.colors.primary,
    marginBottom: theme.spacing.md,
  },
  speakerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  speakerImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: theme.spacing.md,
  },
  speakerInfo: {
    flex: 1,
  },
  speakerName: {
    fontSize: theme.fontSize.md,
    fontWeight: '600',
    color: theme.colors.gray[800],
  },
  speakerTagline: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.gray[500],
    marginTop: 2,
  },
  description: {
    fontSize: theme.fontSize.md,
    color: theme.colors.gray[700],
    lineHeight: 24,
  },
  lockedContainer: {
    backgroundColor: theme.colors.gray[100],
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
  },
  lockedText: {
    fontSize: theme.fontSize.md,
    color: theme.colors.gray[500],
    textAlign: 'center',
  },
  existingRatingInfo: {
    marginTop: theme.spacing.md,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.gray[50],
    borderRadius: theme.borderRadius.md,
  },
  existingRatingText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.gray[600],
  },
  statusText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.gray[600],
    marginTop: theme.spacing.xs,
  },
  statusValue: {
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  errorText: {
    fontSize: theme.fontSize.lg,
    color: theme.colors.error,
  },
})
