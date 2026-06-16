import React from 'react';
import { Text } from 'react-native';
import { render, screen, fireEvent } from '@testing-library/react-native';

import { Collapsible } from '@/components/ui/collapsible';

jest.mock('@/hooks/use-theme', () => ({
  useTheme: () => ({
    text: '#000000',
    background: '#ffffff',
    backgroundElement: '#F0F0F3',
    backgroundSelected: '#E0E1E6',
    textSecondary: '#60646C',
  }),
}));

jest.mock('expo-symbols', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { Text: MockText } = require('react-native');
  return {
    SymbolView: () => <MockText testID="symbol-icon">icon</MockText>,
  };
});

jest.mock('react-native-reanimated', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { View: MockView } = require('react-native');
  return {
    __esModule: true,
    default: {
      View: ({ children, entering: _entering, ...rest }: Record<string, unknown>) => (
        <MockView {...rest}>{children}</MockView>
      ),
    },
    FadeIn: {
      duration: () => ({}),
    },
  };
});

describe('Collapsible', () => {
  it('renders the title', () => {
    render(
      <Collapsible title="Test Section">
        <Text>Hidden content</Text>
      </Collapsible>
    );
    expect(screen.getByText('Test Section')).toBeTruthy();
  });

  it('does not render children when collapsed', () => {
    render(
      <Collapsible title="Test Section">
        <Text>Hidden content</Text>
      </Collapsible>
    );
    expect(screen.queryByText('Hidden content')).toBeNull();
  });

  it('renders children after pressing the header', () => {
    render(
      <Collapsible title="Test Section">
        <Text>Hidden content</Text>
      </Collapsible>
    );
    fireEvent.press(screen.getByText('Test Section'));
    expect(screen.getByText('Hidden content')).toBeTruthy();
  });

  it('hides children after pressing the header twice', () => {
    render(
      <Collapsible title="Test Section">
        <Text>Hidden content</Text>
      </Collapsible>
    );
    const header = screen.getByText('Test Section');
    fireEvent.press(header);
    expect(screen.getByText('Hidden content')).toBeTruthy();
    fireEvent.press(header);
    expect(screen.queryByText('Hidden content')).toBeNull();
  });
});
