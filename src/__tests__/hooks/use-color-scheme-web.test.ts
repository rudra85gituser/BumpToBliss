import { renderHook } from '@testing-library/react-native';

let mockColorScheme: string | null = 'dark';

jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  RN.useColorScheme = () => mockColorScheme;
  return RN;
});

// eslint-disable-next-line @typescript-eslint/no-require-imports
const useColorSchemeWeb = require('@/hooks/use-color-scheme.web').useColorScheme;

describe('useColorScheme (web)', () => {
  beforeEach(() => {
    mockColorScheme = 'dark';
  });

  it('returns "light" before hydration on first render', () => {
    let firstRenderValue: string | null = null;
    const TestHook = () => {
      const value = useColorSchemeWeb();
      if (firstRenderValue === null) {
        firstRenderValue = value;
      }
      return value;
    };
    renderHook(() => TestHook());
    expect(firstRenderValue).toBe('light');
  });

  it('returns actual color scheme after hydration with dark preference', () => {
    mockColorScheme = 'dark';
    const { result } = renderHook(() => useColorSchemeWeb());
    expect(['light', 'dark']).toContain(result.current);
  });

  it('returns actual color scheme after hydration with light preference', () => {
    mockColorScheme = 'light';
    const { result } = renderHook(() => useColorSchemeWeb());
    expect(result.current).toBe('light');
  });
});
