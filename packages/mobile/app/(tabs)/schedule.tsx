import React, { useEffect, useState, useCallback } from 'react'
import {
  View,
  Text,
  SectionList,
  StyleSheet,
  RefreshControl,
} from 'react-native'
import { useRouter } from 'expo-router'
import {
  theme,
  useSessionizeSchedule,
  getAllSessions,
  formatDate,
} from '@cloudnative/shared'
import type { Session, GridEntry } from '@cloudnative/shared'
import { useAuth } from '../../contexts/AuthContext'
import { SessionCard, LoadingScreen } from '../../components'
import { getUserRatings } from '../../services/ratings'

interface SectionData {
  title: string
  data: Session[]
}

export default function ScheduleScreen() {
  const router = useRouter()
  const { user } = useAuth()
  const { schedule, loading, error, refetch } = useSessionizeSchedule()
  const [refreshing, setRefreshing] = useState(false)
  const [ratedSessionIds, setRatedSessionIds] = useState<Set<string>>(new Set())

  const loadUserRatings = useCallback(async () => {
    if (!user) return
    try {
      const ratings = await getUserRatings(user.uid)
      setRatedSessionIds(new Set(ratings.map((r) => r.sessionId)))
    } catch (err) {
      console.error('Failed to load user ratings:', err)
    }
  }, [user])

  useEffect(() => {
    loadUserRatings()
  }, [loadUserRatings])

  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    await Promise.all([refetch(), loadUserRatings()])
    setRefreshing(false)
  }, [refetch, loadUserRatings])

  const handleSessionPress = (session: Session) => {
    router.push(`/session/${session.id}`)
  }

  const sections: SectionData[] = schedule.map((entry: GridEntry) => {
    const sessions = getAllSessions([entry]).filter((s) => !s.isServiceSession)
    return {
      title: formatDate(entry.date),
      data: sessions,
    }
  })

  if (loading && !refreshing) {
    return <LoadingScreen />
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Failed to load schedule</Text>
        <Text style={styles.errorSubtext}>{error.message}</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SessionCard
            session={item}
            onPress={() => handleSessionPress(item)}
            hasRated={ratedSessionIds.has(item.id)}
          />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{title}</Text>
          </View>
        )}
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
            <Text style={styles.emptyText}>No sessions available</Text>
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
  },
  sectionHeader: {
    backgroundColor: theme.colors.gray[50],
    paddingVertical: theme.spacing.sm,
    marginBottom: theme.spacing.xs,
  },
  sectionTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: '700',
    color: theme.colors.primary,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  errorText: {
    fontSize: theme.fontSize.lg,
    fontWeight: '600',
    color: theme.colors.error,
    marginBottom: theme.spacing.sm,
  },
  errorSubtext: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.gray[500],
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: theme.spacing.xxl,
  },
  emptyText: {
    fontSize: theme.fontSize.md,
    color: theme.colors.gray[500],
  },
})
