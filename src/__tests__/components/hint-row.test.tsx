import React from 'react';
import { render, screen } from '@testing-library/react-native';

import { HintRow } from '@/components/hint-row';

jest.mock('@/hooks/use-theme', () => ({
  useTheme: () => ({
    text: '#000000',
    background: '#ffffff',
    backgroundElement: '#F0F0F3',
    backgroundSelected: '#E0E1E6',
    textSecondary: '#60646C',
  }),
}));

describe('HintRow', () => {
  it('renders with default props', () => {
    render(<HintRow />);
    expect(screen.getByText('Try editing')).toBeTruthy();
    expect(screen.getByText('app/index.tsx')).toBeTruthy();
  });

  it('renders with custom title', () => {
    render(<HintRow title="Custom title" />);
    expect(screen.getByText('Custom title')).toBeTruthy();
  });

  it('renders with custom hint as string', () => {
    render(<HintRow hint="Custom hint" />);
    expect(screen.getByText('Custom hint')).toBeTruthy();
  });

  it('renders with custom title and hint', () => {
    render(<HintRow title="My Title" hint="My Hint" />);
    expect(screen.getByText('My Title')).toBeTruthy();
    expect(screen.getByText('My Hint')).toBeTruthy();
  });
});
