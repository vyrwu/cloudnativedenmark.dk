import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { theme, formatRelativeTime } from '@cloudnative/shared'
import type { Rating, Session } from '@cloudnative/shared'
import { StarRating } from './StarRating'
import { StatusBadge } from './StatusBadge'

interface FeedbackCardProps {
  rating: Rating
  session?: Session
  showSession?: boolean
  showStatus?: boolean
  showActions?: boolean
  onApprove?: () => void
  onReject?: () => void
  onHide?: () => void
}

export const FeedbackCard: React.FC<FeedbackCardProps> = ({
  rating,
  session,
  showSession = true,
  showStatus = true,
  showActions = false,
  onApprove,
  onReject,
  onHide,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <StarRating rating={rating.stars} size={20} readonly />
        {showStatus && <StatusBadge status={rating.status} />}
      </View>

      {showSession && session && (
        <Text style={styles.sessionTitle} numberOfLines={1}>
          {session.title || session.name}
        </Text>
      )}

      {rating.comment ? (
        <Text style={styles.comment}>{rating.comment}</Text>
      ) : (
        <Text style={styles.noComment}>No comment provided</Text>
      )}

      <View style={styles.footer}>
        <Text style={styles.timestamp}>
          {formatRelativeTime(rating.createdAt)}
        </Text>

        {showActions && (
          <View style={styles.actions}>
            {rating.status !== 'approved' && onApprove && (
              <TouchableOpacity
                style={[styles.actionButton, styles.approveButton]}
                onPress={onApprove}
              >
                <Ionicons name="checkmark" size={18} color={theme.colors.white} />
              </TouchableOpacity>
            )}
            {rating.status !== 'rejected' && onReject && (
              <TouchableOpacity
                style={[styles.actionButton, styles.rejectButton]}
                onPress={onReject}
              >
                <Ionicons name="close" size={18} color={theme.colors.white} />
              </TouchableOpacity>
            )}
            {rating.status !== 'hidden' && onHide && (
              <TouchableOpacity
                style={[styles.actionButton, styles.hideButton]}
                onPress={onHide}
              >
                <Ionicons name="eye-off" size={18} color={theme.colors.white} />
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    </View>
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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  sessionTitle: {
    fontSize: theme.fontSize.sm,
    fontWeight: '600',
    color: theme.colors.primary,
    marginBottom: theme.spacing.xs,
  },
  comment: {
    fontSize: theme.fontSize.md,
    color: theme.colors.gray[700],
    lineHeight: 22,
  },
  noComment: {
    fontSize: theme.fontSize.md,
    color: theme.colors.gray[400],
    fontStyle: 'italic',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing.md,
    paddingTop: theme.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: theme.colors.gray[100],
  },
  timestamp: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.gray[500],
  },
  actions: {
    flexDirection: 'row',
    gap: theme.spacing.xs,
  },
  actionButton: {
    width: 32,
    height: 32,
    borderRadius: theme.borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  approveButton: {
    backgroundColor: theme.colors.success,
  },
  rejectButton: {
    backgroundColor: theme.colors.error,
  },
  hideButton: {
    backgroundColor: theme.colors.warning,
  },
})
