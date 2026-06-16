import { renderHook } from '@testing-library/react-native';

import { Colors } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

jest.mock('@/hooks/use-color-scheme', () => ({
  useColorScheme: jest.fn(),
}));

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { useColorScheme } = require('@/hooks/use-color-scheme');

describe('useTheme', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('returns light colors when scheme is "light"', () => {
    useColorScheme.mockReturnValue('light');
    const { result } = renderHook(() => useTheme());
    expect(result.current).toEqual(Colors.light);
  });

  it('returns dark colors when scheme is "dark"', () => {
    useColorScheme.mockReturnValue('dark');
    const { result } = renderHook(() => useTheme());
    expect(result.current).toEqual(Colors.dark);
  });

  it('falls back to light colors when scheme is "unspecified"', () => {
    useColorScheme.mockReturnValue('unspecified');
    const { result } = renderHook(() => useTheme());
    expect(result.current).toEqual(Colors.light);
  });
});
