import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { theme } from '@cloudnative/shared'
import type { StarRating as StarRatingType } from '@cloudnative/shared'

interface StarRatingProps {
  rating: number
  onRatingChange?: (rating: StarRatingType) => void
  size?: number
  readonly?: boolean
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  onRatingChange,
  size = 32,
  readonly = false,
}) => {
  const stars = [1, 2, 3, 4, 5] as const

  const handlePress = (star: StarRatingType) => {
    if (!readonly && onRatingChange) {
      onRatingChange(star)
    }
  }

  return (
    <View style={styles.container}>
      {stars.map((star) => (
        <TouchableOpacity
          key={star}
          onPress={() => handlePress(star)}
          disabled={readonly}
          style={styles.star}
          accessibilityLabel={`${star} star${star > 1 ? 's' : ''}`}
          accessibilityRole="button"
        >
          <Ionicons
            name={star <= rating ? 'star' : 'star-outline'}
            size={size}
            color={star <= rating ? theme.colors.warning : theme.colors.gray[300]}
          />
        </TouchableOpacity>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    padding: 4,
  },
})
