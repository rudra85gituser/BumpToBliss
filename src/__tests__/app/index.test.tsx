import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { Platform } from 'react-native';

import HomeScreen from '@/app/index';

jest.mock('@/hooks/use-theme', () => ({
  useTheme: () => ({
    text: '#000000',
    background: '#ffffff',
    backgroundElement: '#F0F0F3',
    backgroundSelected: '#E0E1E6',
    textSecondary: '#60646C',
  }),
}));

jest.mock('react-native-safe-area-context', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { View: MockView } = require('react-native');
  return {
    SafeAreaView: ({ children, ...props }: Record<string, unknown>) => (
      <MockView {...props}>{children}</MockView>
    ),
    useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
  };
});

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

jest.mock('expo-device', () => ({
  isDevice: false,
}));

jest.mock('@/components/animated-icon', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { View: MockView } = require('react-native');
  return {
    AnimatedIcon: () => <MockView testID="animated-icon" />,
  };
});

describe('HomeScreen', () => {
  it('renders the welcome title', () => {
    render(<HomeScreen />);
    expect(screen.getByText(/Welcome to/)).toBeTruthy();
  });

  it('renders "get started" text', () => {
    render(<HomeScreen />);
    expect(screen.getByText('get started')).toBeTruthy();
  });

  it('renders hint rows', () => {
    render(<HomeScreen />);
    expect(screen.getByText('Try editing')).toBeTruthy();
    expect(screen.getByText('Dev tools')).toBeTruthy();
    expect(screen.getByText('Fresh start')).toBeTruthy();
  });

  it('renders dev menu hint for emulator', () => {
    render(<HomeScreen />);
    if (Platform.OS === 'android') {
      expect(screen.getByText(/cmd\+m/)).toBeTruthy();
    }
  });
});
