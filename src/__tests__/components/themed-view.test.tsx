import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { Text } from 'react-native';

import { ThemedView } from '@/components/themed-view';

jest.mock('@/hooks/use-theme', () => ({
  useTheme: () => ({
    text: '#000000',
    background: '#ffffff',
    backgroundElement: '#F0F0F3',
    backgroundSelected: '#E0E1E6',
    textSecondary: '#60646C',
  }),
}));

describe('ThemedView', () => {
  it('renders children', () => {
    render(
      <ThemedView>
        <Text>Child content</Text>
      </ThemedView>
    );
    expect(screen.getByText('Child content')).toBeTruthy();
  });

  it('applies background color by default', () => {
    render(<ThemedView testID="view" />);
    const element = screen.getByTestId('view');
    const style = element.props.style;
    const flatStyle = Array.isArray(style)
      ? style.reduce((acc: Record<string, unknown>, s: Record<string, unknown> | undefined | false) => (s ? { ...acc, ...s } : acc), {})
      : style;
    expect(flatStyle.backgroundColor).toBe('#ffffff');
  });

  it('applies backgroundElement color when type is set', () => {
    render(<ThemedView testID="element-view" type="backgroundElement" />);
    const element = screen.getByTestId('element-view');
    const style = element.props.style;
    const flatStyle = Array.isArray(style)
      ? style.reduce((acc: Record<string, unknown>, s: Record<string, unknown> | undefined | false) => (s ? { ...acc, ...s } : acc), {})
      : style;
    expect(flatStyle.backgroundColor).toBe('#F0F0F3');
  });

  it('applies backgroundSelected color when type is set', () => {
    render(<ThemedView testID="selected-view" type="backgroundSelected" />);
    const element = screen.getByTestId('selected-view');
    const style = element.props.style;
    const flatStyle = Array.isArray(style)
      ? style.reduce((acc: Record<string, unknown>, s: Record<string, unknown> | undefined | false) => (s ? { ...acc, ...s } : acc), {})
      : style;
    expect(flatStyle.backgroundColor).toBe('#E0E1E6');
  });

  it('merges custom styles', () => {
    render(<ThemedView testID="custom" style={{ padding: 10 }} />);
    const element = screen.getByTestId('custom');
    const style = element.props.style;
    const flatStyle = Array.isArray(style)
      ? style.reduce((acc: Record<string, unknown>, s: Record<string, unknown> | undefined | false) => (s ? { ...acc, ...s } : acc), {})
      : style;
    expect(flatStyle.padding).toBe(10);
    expect(flatStyle.backgroundColor).toBe('#ffffff');
  });
});
