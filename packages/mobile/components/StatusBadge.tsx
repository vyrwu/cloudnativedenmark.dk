import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { theme } from '@cloudnative/shared'
import type { RatingStatus } from '@cloudnative/shared'

interface StatusBadgeProps {
  status: RatingStatus
}

const statusConfig: Record<RatingStatus, { label: string; color: string; bgColor: string }> = {
  pending: {
    label: 'Pending',
    color: theme.colors.gray[700],
    bgColor: theme.colors.gray[200],
  },
  approved: {
    label: 'Approved',
    color: theme.colors.success,
    bgColor: '#dcfce7',
  },
  rejected: {
    label: 'Rejected',
    color: theme.colors.error,
    bgColor: '#fee2e2',
  },
  hidden: {
    label: 'Hidden',
    color: theme.colors.warning,
    bgColor: '#fef3c7',
  },
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const config = statusConfig[status]

  return (
    <View style={[styles.badge, { backgroundColor: config.bgColor }]}>
      <Text style={[styles.text, { color: config.color }]}>{config.label}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
  },
  text: {
    fontSize: theme.fontSize.xs,
    fontWeight: '600',
  },
})
