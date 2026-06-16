import { Colors, Fonts, Spacing, BottomTabInset, MaxContentWidth } from '@/constants/theme';
import { Platform } from 'react-native';

describe('Colors', () => {
  it('defines light and dark color schemes', () => {
    expect(Colors).toHaveProperty('light');
    expect(Colors).toHaveProperty('dark');
  });

  it('light scheme has all required color keys', () => {
    expect(Colors.light).toEqual({
      text: '#000000',
      background: '#ffffff',
      backgroundElement: '#F0F0F3',
      backgroundSelected: '#E0E1E6',
      textSecondary: '#60646C',
    });
  });

  it('dark scheme has all required color keys', () => {
    expect(Colors.dark).toEqual({
      text: '#ffffff',
      background: '#000000',
      backgroundElement: '#212225',
      backgroundSelected: '#2E3135',
      textSecondary: '#B0B4BA',
    });
  });

  it('light and dark schemes have the same keys', () => {
    const lightKeys = Object.keys(Colors.light).sort();
    const darkKeys = Object.keys(Colors.dark).sort();
    expect(lightKeys).toEqual(darkKeys);
  });
});

describe('Fonts', () => {
  it('is defined and has font family keys', () => {
    expect(Fonts).toBeDefined();
    expect(Fonts).toHaveProperty('sans');
    expect(Fonts).toHaveProperty('serif');
    expect(Fonts).toHaveProperty('rounded');
    expect(Fonts).toHaveProperty('mono');
  });

  it('returns default platform fonts for non-iOS/web', () => {
    // jest-expo uses android by default
    if (Platform.OS !== 'ios' && Platform.OS !== 'web') {
      expect(Fonts).toEqual({
        sans: 'normal',
        serif: 'serif',
        rounded: 'normal',
        mono: 'monospace',
      });
    }
  });
});

describe('Spacing', () => {
  it('defines all spacing levels', () => {
    expect(Spacing).toEqual({
      half: 2,
      one: 4,
      two: 8,
      three: 16,
      four: 24,
      five: 32,
      six: 64,
    });
  });

  it('spacing values increase monotonically', () => {
    const values = Object.values(Spacing);
    for (let i = 1; i < values.length; i++) {
      expect(values[i]).toBeGreaterThan(values[i - 1]);
    }
  });
});

describe('BottomTabInset', () => {
  it('is a number', () => {
    expect(typeof BottomTabInset).toBe('number');
  });

  it('is non-negative', () => {
    expect(BottomTabInset).toBeGreaterThanOrEqual(0);
  });
});

describe('MaxContentWidth', () => {
  it('equals 800', () => {
    expect(MaxContentWidth).toBe(800);
  });
});
