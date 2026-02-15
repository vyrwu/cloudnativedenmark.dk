import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { theme, formatTimeDetailed, hasSessionStarted } from '@cloudnative/shared'
import type { Session } from '@cloudnative/shared'

interface SessionCardProps {
  session: Session
  onPress: () => void
  hasRated?: boolean
}

export const SessionCard: React.FC<SessionCardProps> = ({
  session,
  onPress,
  hasRated = false,
}) => {
  const isServiceSession = session.isServiceSession
  const canRate = hasSessionStarted(session.startsAt)

  if (isServiceSession) {
    return (
      <View style={[styles.card, styles.serviceCard]}>
        <Text style={styles.serviceTitle}>{session.title || session.name}</Text>
        <Text style={styles.time}>
          {formatTimeDetailed(session.startsAt)} - {formatTimeDetailed(session.endsAt)}
        </Text>
      </View>
    )
  }

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.header}>
        <View style={styles.roomBadge}>
          <Text style={styles.roomText}>{session.room}</Text>
        </View>
        {hasRated && (
          <View style={styles.ratedBadge}>
            <Ionicons name="checkmark-circle" size={16} color={theme.colors.success} />
            <Text style={styles.ratedText}>Rated</Text>
          </View>
        )}
      </View>

      <Text style={styles.title}>{session.title || session.name}</Text>

      {session.speakers && session.speakers.length > 0 && (
        <Text style={styles.speakers}>
          {session.speakers.map((s) => s.fullName || s.name).join(', ')}
        </Text>
      )}

      <View style={styles.footer}>
        <Text style={styles.time}>
          {formatTimeDetailed(session.startsAt)} - {formatTimeDetailed(session.endsAt)}
        </Text>
        {!canRate && (
          <View style={styles.lockedBadge}>
            <Ionicons name="lock-closed" size={12} color={theme.colors.gray[500]} />
            <Text style={styles.lockedText}>Rating locked</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.gray[200],
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  serviceCard: {
    backgroundColor: theme.colors.gray[100],
    borderColor: theme.colors.gray[300],
  },
  serviceTitle: {
    fontSize: theme.fontSize.md,
    color: theme.colors.gray[600],
    fontWeight: '500',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  roomBadge: {
    backgroundColor: theme.colors.backgroundLight,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.sm,
  },
  roomText: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.primary,
    fontWeight: '600',
  },
  ratedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratedText: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.success,
    fontWeight: '500',
  },
  title: {
    fontSize: theme.fontSize.md,
    fontWeight: '600',
    color: theme.colors.primary,
    marginBottom: theme.spacing.xs,
  },
  speakers: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.gray[600],
    marginBottom: theme.spacing.sm,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  time: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.gray[500],
  },
  lockedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  lockedText: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.gray[500],
  },
})
