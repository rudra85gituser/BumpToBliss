import React from 'react';
import { render, screen } from '@testing-library/react-native';

import { ExternalLink } from '@/components/external-link';

jest.mock('expo-router', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { Text: MockText } = require('react-native');
  return {
    Link: ({ children, ...rest }: Record<string, unknown>) => (
      <MockText {...rest}>{children}</MockText>
    ),
  };
});

jest.mock('expo-web-browser', () => ({
  openBrowserAsync: jest.fn(),
  WebBrowserPresentationStyle: { AUTOMATIC: 0 },
}));

describe('ExternalLink', () => {
  it('renders children', () => {
    render(<ExternalLink href="https://example.com">Visit Example</ExternalLink>);
    expect(screen.getByText('Visit Example')).toBeTruthy();
  });

  it('renders with the correct href', () => {
    render(<ExternalLink href="https://docs.expo.dev">Expo Docs</ExternalLink>);
    expect(screen.getByText('Expo Docs')).toBeTruthy();
  });
});
