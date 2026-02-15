import React, { useEffect, useState, useCallback } from 'react'
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
  Alert,
} from 'react-native'
import {
  theme,
  useSessionizeSchedule,
  getSessionById,
  getSpeakerSessionIds,
} from '@cloudnative/shared'
import type { Rating, Session, RatingStatus } from '@cloudnative/shared'
import { useAuth } from '../../contexts/AuthContext'
import { FeedbackCard, LoadingScreen } from '../../components'
import {
  getPendingRatings,
  getAllRatings,
  getApprovedRatingsForSessions,
  moderateRating,
} from '../../services/ratings'

type FilterType = 'all' | 'pending' | 'approved' | 'rejected'

export default function FeedbackScreen() {
  const { user, profile, isAdmin } = useAuth()
  const { schedule } = useSessionizeSchedule()
  const [ratings, setRatings] = useState<Rating[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [filter, setFilter] = useState<FilterType>(isAdmin ? 'pending' : 'all')

  const loadRatings = useCallback(async () => {
    if (!user || !profile) return

    try {
      let fetchedRatings: Rating[] = []

      if (isAdmin) {
        if (filter === 'pending') {
          fetchedRatings = await getPendingRatings()
        } else {
          const allRatings = await getAllRatings()
          if (filter === 'all') {
            fetchedRatings = allRatings
          } else {
            fetchedRatings = allRatings.filter((r) => r.status === filter)
          }
        }
      } else if (profile.role === 'speaker' && profile.sessionizeId) {
        const speakerSessionIds = getSpeakerSessionIds(
          schedule,
          profile.sessionizeId
        )
        fetchedRatings = await getApprovedRatingsForSessions(speakerSessionIds)
      }

      setRatings(fetchedRatings)
    } catch (err) {
      console.error('Failed to load feedback:', err)
    } finally {
      setLoading(false)
    }
  }, [user, profile, isAdmin, schedule, filter])

  useEffect(() => {
    loadRatings()
  }, [loadRatings])

  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    await loadRatings()
    setRefreshing(false)
  }, [loadRatings])

  const handleModerate = async (
    ratingId: string,
    status: RatingStatus
  ) => {
    if (!user) return

    const actionLabels: Record<string, string> = {
      approved: 'approve',
      rejected: 'reject',
      hidden: 'hide',
    }

    Alert.alert(
      'Confirm Action',
      `Are you sure you want to ${actionLabels[status]} this feedback?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm',
          onPress: async () => {
            try {
              await moderateRating(ratingId, user.uid, { status })
              await loadRatings()
            } catch (err) {
              Alert.alert('Error', 'Failed to moderate feedback')
            }
          },
        },
      ]
    )
  }

  const getSessionForRating = (rating: Rating): Session | undefined => {
    return getSessionById(schedule, rating.sessionId)
  }

  const filters: FilterType[] = isAdmin
    ? ['pending', 'all', 'approved', 'rejected']
    : ['all']

  if (loading) {
    return <LoadingScreen />
  }

  return (
    <View style={styles.container}>
      {isAdmin && (
        <View style={styles.filterContainer}>
          {filters.map((f) => (
            <TouchableOpacity
              key={f}
              style={[
                styles.filterButton,
                filter === f && styles.filterButtonActive,
              ]}
              onPress={() => setFilter(f)}
            >
              <Text
                style={[
                  styles.filterText,
                  filter === f && styles.filterTextActive,
                ]}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <FlatList
        data={ratings}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const session = getSessionForRating(item)
          return (
            <FeedbackCard
              rating={item}
              session={session}
              showSession={true}
              showStatus={true}
              showActions={isAdmin}
              onApprove={() => handleModerate(item.id, 'approved')}
              onReject={() => handleModerate(item.id, 'rejected')}
              onHide={() => handleModerate(item.id, 'hidden')}
            />
          )
        }}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.colors.background}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>
              {isAdmin ? 'No feedback to review' : 'No feedback yet'}
            </Text>
            <Text style={styles.emptySubtext}>
              {isAdmin
                ? 'Check back later for new feedback'
                : 'Approved feedback for your sessions will appear here'}
            </Text>
          </View>
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.gray[50],
  },
  filterContainer: {
    flexDirection: 'row',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[200],
    gap: theme.spacing.xs,
  },
  filterButton: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.gray[100],
  },
  filterButtonActive: {
    backgroundColor: theme.colors.background,
  },
  filterText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.gray[600],
    fontWeight: '500',
  },
  filterTextActive: {
    color: theme.colors.white,
  },
  listContent: {
    padding: theme.spacing.md,
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: theme.spacing.xxl,
  },
  emptyTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: '600',
    color: theme.colors.gray[600],
    marginBottom: theme.spacing.sm,
  },
  emptySubtext: {
    fontSize: theme.fontSize.md,
    color: theme.colors.gray[500],
    textAlign: 'center',
    paddingHorizontal: theme.spacing.lg,
  },
})
