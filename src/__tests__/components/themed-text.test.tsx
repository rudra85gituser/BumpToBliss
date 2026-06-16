import React from 'react';
import { render, screen } from '@testing-library/react-native';

import { ThemedText } from '@/components/themed-text';

jest.mock('@/hooks/use-theme', () => ({
  useTheme: () => ({
    text: '#000000',
    background: '#ffffff',
    backgroundElement: '#F0F0F3',
    backgroundSelected: '#E0E1E6',
    textSecondary: '#60646C',
  }),
}));

describe('ThemedText', () => {
  it('renders children text', () => {
    render(<ThemedText>Hello World</ThemedText>);
    expect(screen.getByText('Hello World')).toBeTruthy();
  });

  it('renders with default type', () => {
    render(<ThemedText>Default text</ThemedText>);
    const element = screen.getByText('Default text');
    expect(element).toBeTruthy();
  });

  it('renders with title type', () => {
    render(<ThemedText type="title">Title text</ThemedText>);
    expect(screen.getByText('Title text')).toBeTruthy();
  });

  it('renders with subtitle type', () => {
    render(<ThemedText type="subtitle">Subtitle text</ThemedText>);
    expect(screen.getByText('Subtitle text')).toBeTruthy();
  });

  it('renders with small type', () => {
    render(<ThemedText type="small">Small text</ThemedText>);
    expect(screen.getByText('Small text')).toBeTruthy();
  });

  it('renders with smallBold type', () => {
    render(<ThemedText type="smallBold">SmallBold text</ThemedText>);
    expect(screen.getByText('SmallBold text')).toBeTruthy();
  });

  it('renders with link type', () => {
    render(<ThemedText type="link">Link text</ThemedText>);
    expect(screen.getByText('Link text')).toBeTruthy();
  });

  it('renders with linkPrimary type', () => {
    render(<ThemedText type="linkPrimary">Primary Link</ThemedText>);
    expect(screen.getByText('Primary Link')).toBeTruthy();
  });

  it('renders with code type', () => {
    render(<ThemedText type="code">Code text</ThemedText>);
    expect(screen.getByText('Code text')).toBeTruthy();
  });

  it('applies theme color for text by default', () => {
    render(<ThemedText testID="themed">Hello</ThemedText>);
    const element = screen.getByTestId('themed');
    const style = element.props.style;
    // The first style in the array is the theme color
    const flatStyle = Array.isArray(style)
      ? style.reduce((acc: Record<string, unknown>, s: Record<string, unknown> | undefined | false) => (s ? { ...acc, ...s } : acc), {})
      : style;
    expect(flatStyle.color).toBe('#000000');
  });

  it('applies secondary theme color when themeColor is set', () => {
    render(<ThemedText testID="secondary" themeColor="textSecondary">Secondary</ThemedText>);
    const element = screen.getByTestId('secondary');
    const style = element.props.style;
    const flatStyle = Array.isArray(style)
      ? style.reduce((acc: Record<string, unknown>, s: Record<string, unknown> | undefined | false) => (s ? { ...acc, ...s } : acc), {})
      : style;
    expect(flatStyle.color).toBe('#60646C');
  });
});
