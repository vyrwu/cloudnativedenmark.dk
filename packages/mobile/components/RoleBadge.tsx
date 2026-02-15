import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { theme } from '@cloudnative/shared'
import type { UserRole } from '@cloudnative/shared'

interface RoleBadgeProps {
  role: UserRole
}

const roleConfig: Record<UserRole, { label: string; color: string }> = {
  admin: { label: 'Admin', color: theme.colors.error },
  speaker: { label: 'Speaker', color: theme.colors.background },
  attendee: { label: 'Attendee', color: theme.colors.gray[500] },
}

export const RoleBadge: React.FC<RoleBadgeProps> = ({ role }) => {
  const config = roleConfig[role]

  return (
    <View style={[styles.badge, { backgroundColor: config.color }]}>
      <Text style={styles.text}>{config.label}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
  },
  text: {
    color: theme.colors.white,
    fontSize: theme.fontSize.sm,
    fontWeight: '600',
  },
})
