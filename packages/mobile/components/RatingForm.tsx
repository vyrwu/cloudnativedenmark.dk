import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native'
import { theme } from '@cloudnative/shared'
import type { StarRating as StarRatingType } from '@cloudnative/shared'
import { StarRating } from './StarRating'

interface RatingFormProps {
  initialStars?: StarRatingType
  initialComment?: string
  onSubmit: (stars: StarRatingType, comment: string) => Promise<void>
  submitLabel?: string
  disabled?: boolean
}

export const RatingForm: React.FC<RatingFormProps> = ({
  initialStars,
  initialComment = '',
  onSubmit,
  submitLabel = 'Submit Rating',
  disabled = false,
}) => {
  const [stars, setStars] = useState<StarRatingType | undefined>(initialStars)
  const [comment, setComment] = useState(initialComment)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async () => {
    if (!stars) {
      setError('Please select a rating')
      return
    }

    setError(null)
    setIsSubmitting(true)

    try {
      await onSubmit(stars, comment.trim())
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit rating')
    } finally {
      setIsSubmitting(false)
    }
  }

  const isValid = stars !== undefined && !disabled

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Your Rating</Text>
      <StarRating
        rating={stars || 0}
        onRatingChange={setStars}
        size={40}
        readonly={disabled}
      />

      <Text style={[styles.label, styles.commentLabel]}>Comment (optional)</Text>
      <TextInput
        style={styles.input}
        value={comment}
        onChangeText={setComment}
        placeholder="Share your thoughts about this session..."
        placeholderTextColor={theme.colors.gray[400]}
        multiline
        numberOfLines={4}
        textAlignVertical="top"
        editable={!disabled}
      />

      {error && <Text style={styles.error}>{error}</Text>}

      <TouchableOpacity
        style={[styles.button, (!isValid || isSubmitting) && styles.buttonDisabled]}
        onPress={handleSubmit}
        disabled={!isValid || isSubmitting}
        activeOpacity={0.8}
      >
        {isSubmitting ? (
          <ActivityIndicator color={theme.colors.white} />
        ) : (
          <Text style={styles.buttonText}>{submitLabel}</Text>
        )}
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.md,
  },
  label: {
    fontSize: theme.fontSize.md,
    fontWeight: '600',
    color: theme.colors.primary,
    marginBottom: theme.spacing.sm,
  },
  commentLabel: {
    marginTop: theme.spacing.lg,
  },
  input: {
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.gray[300],
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    fontSize: theme.fontSize.md,
    color: theme.colors.gray[800],
    minHeight: 120,
  },
  error: {
    color: theme.colors.error,
    fontSize: theme.fontSize.sm,
    marginTop: theme.spacing.sm,
  },
  button: {
    backgroundColor: theme.colors.background,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.full,
    alignItems: 'center',
    marginTop: theme.spacing.lg,
  },
  buttonDisabled: {
    backgroundColor: theme.colors.gray[400],
  },
  buttonText: {
    color: theme.colors.white,
    fontSize: theme.fontSize.md,
    fontWeight: '600',
  },
})
