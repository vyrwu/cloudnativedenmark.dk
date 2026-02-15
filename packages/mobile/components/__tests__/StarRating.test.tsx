import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import { StarRating } from '../StarRating'

describe('StarRating', () => {
  it('should render 5 stars', () => {
    const { getAllByRole } = render(
      <StarRating rating={3} onRatingChange={() => {}} />
    )
    const buttons = getAllByRole('button')
    expect(buttons).toHaveLength(5)
  })

  it('should call onRatingChange when star is pressed', () => {
    const mockOnChange = jest.fn()
    const { getAllByRole } = render(
      <StarRating rating={0} onRatingChange={mockOnChange} />
    )
    const buttons = getAllByRole('button')
    fireEvent.press(buttons[3]) // Press 4th star
    expect(mockOnChange).toHaveBeenCalledWith(4)
  })

  it('should not call onRatingChange when readonly', () => {
    const mockOnChange = jest.fn()
    const { getAllByRole } = render(
      <StarRating rating={3} onRatingChange={mockOnChange} readonly />
    )
    const buttons = getAllByRole('button')
    fireEvent.press(buttons[0])
    expect(mockOnChange).not.toHaveBeenCalled()
  })

  it('should display correct number of filled stars', () => {
    const { getAllByRole } = render(
      <StarRating rating={3} onRatingChange={() => {}} />
    )
    const buttons = getAllByRole('button')
    // Stars 1-3 should be filled, 4-5 should be outline
    expect(buttons[0].props.accessibilityLabel).toBe('1 star')
    expect(buttons[4].props.accessibilityLabel).toBe('5 stars')
  })
})
