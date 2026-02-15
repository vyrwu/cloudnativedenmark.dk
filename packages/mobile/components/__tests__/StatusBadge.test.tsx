import React from 'react'
import { render } from '@testing-library/react-native'
import { StatusBadge } from '../StatusBadge'

describe('StatusBadge', () => {
  it('should render Pending status correctly', () => {
    const { getByText } = render(<StatusBadge status="pending" />)
    expect(getByText('Pending')).toBeTruthy()
  })

  it('should render Approved status correctly', () => {
    const { getByText } = render(<StatusBadge status="approved" />)
    expect(getByText('Approved')).toBeTruthy()
  })

  it('should render Rejected status correctly', () => {
    const { getByText } = render(<StatusBadge status="rejected" />)
    expect(getByText('Rejected')).toBeTruthy()
  })

  it('should render Hidden status correctly', () => {
    const { getByText } = render(<StatusBadge status="hidden" />)
    expect(getByText('Hidden')).toBeTruthy()
  })
})
