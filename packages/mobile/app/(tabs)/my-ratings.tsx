import React, { useEffect, useState, useCallback } from 'react'
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
} from 'react-native'
import { useRouter } from 'expo-router'
import {
  theme,
  useSessionizeSchedule,
  getSessionById,
} from '@cloudnative/shared'
import type { Rating, Session } from '@cloudnative/shared'
import { useAuth } from '../../contexts/AuthContext'
import { FeedbackCard, LoadingScreen } from '../../components'
import { getUserRatings } from '../../services/ratings'

export default function MyRatingsScreen() {
  const router = useRouter()
  const { user } = useAuth()
  const { schedule } = useSessionizeSchedule()
  const [ratings, setRatings] = useState<Rating[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const loadRatings = useCallback(async () => {
    if (!user) return
    try {
      const userRatings = await getUserRatings(user.uid)
      setRatings(userRatings)
    } catch (err) {
      console.error('Failed to load ratings:', err)
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    loadRatings()
  }, [loadRatings])

  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    await loadRatings()
    setRefreshing(false)
  }, [loadRatings])

  const getSessionForRating = (rating: Rating): Session | undefined => {
    return getSessionById(schedule, rating.sessionId)
  }

  if (loading) {
    return <LoadingScreen />
  }

  return (
    <View style={styles.container}>
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
              showActions={false}
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
            <Text style={styles.emptyTitle}>No ratings yet</Text>
            <Text style={styles.emptySubtext}>
              Attend sessions and share your feedback!
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
  },
})
