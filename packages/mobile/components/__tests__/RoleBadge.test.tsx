import React from 'react'
import { render } from '@testing-library/react-native'
import { RoleBadge } from '../RoleBadge'

describe('RoleBadge', () => {
  it('should render Admin badge correctly', () => {
    const { getByText } = render(<RoleBadge role="admin" />)
    expect(getByText('Admin')).toBeTruthy()
  })

  it('should render Speaker badge correctly', () => {
    const { getByText } = render(<RoleBadge role="speaker" />)
    expect(getByText('Speaker')).toBeTruthy()
  })

  it('should render Attendee badge correctly', () => {
    const { getByText } = render(<RoleBadge role="attendee" />)
    expect(getByText('Attendee')).toBeTruthy()
  })
})
