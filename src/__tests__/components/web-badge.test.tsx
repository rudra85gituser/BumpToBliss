import React from 'react';
import { render, screen } from '@testing-library/react-native';

import { WebBadge } from '@/components/web-badge';

jest.mock('@/hooks/use-theme', () => ({
  useTheme: () => ({
    text: '#000000',
    background: '#ffffff',
    backgroundElement: '#F0F0F3',
    backgroundSelected: '#E0E1E6',
    textSecondary: '#60646C',
  }),
}));

jest.mock('expo-image', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { View: MockView } = require('react-native');
  return {
    Image: ({ style, ...rest }: Record<string, unknown>) => (
      <MockView testID="expo-image" style={style} {...rest} />
    ),
  };
});

jest.mock('expo/package.json', () => ({
  version: '56.0.7',
}));

describe('WebBadge', () => {
  it('renders the version text', () => {
    render(<WebBadge />);
    expect(screen.getByText('v56.0.7')).toBeTruthy();
  });

  it('renders the badge image', () => {
    render(<WebBadge />);
    expect(screen.getByTestId('expo-image')).toBeTruthy();
  });
});
