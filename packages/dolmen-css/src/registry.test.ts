import { describe, expect, test } from 'vitest';
import { createStyleRegistry } from './registry';

describe('registry', () => {
  test('tokens', () => {
    const { tokens } = createStyleRegistry({
      layers: ['uiBase', 'uiVariant', 'uiState'],
      tokens: {
        colors: {
          buttonPrimary: 'red',
          buttonSecondary: 'blue',
        },
      },
    });

    expect(tokens.colors.buttonPrimary).toStrictEqual({
      computedValue: 'red',
      value: 'var(--colors-button-primary)',
      variable: '--colors-button-primary',
    });

    expect(tokens.colors.buttonSecondary).toStrictEqual({
      computedValue: 'blue',
      value: 'var(--colors-button-secondary)',
      variable: '--colors-button-secondary',
    });
  });

  test('createTheme', () => {
    const { createTheme, tokens } = createStyleRegistry({
      layers: ['uiBase', 'uiVariant', 'uiState'],
      tokens: {
        colors: {
          buttonPrimary: 'red',
          buttonSecondary: 'blue',
        },
      },
    });

    const theme = createTheme('light', {
      colors: {
        buttonPrimary: 'white',
      },
    });

    // buttonPrimary set to new value
    expect(theme.tokens.colors.buttonPrimary).toStrictEqual({
      computedValue: 'white',
      value: 'var(--colors-button-primary)',
      variable: '--colors-button-primary',
    });

    // Other styles unchanged
    expect(theme.tokens.colors.buttonSecondary).toStrictEqual({
      computedValue: 'blue',
      value: 'var(--colors-button-secondary)',
      variable: '--colors-button-secondary',
    });

    // Original tokens unchanged
    expect(tokens.colors.buttonPrimary).toStrictEqual({
      computedValue: 'red',
      value: 'var(--colors-button-primary)',
      variable: '--colors-button-primary',
    });
  });

  test('layers', () => {
    const { layers, layersOrder } = createStyleRegistry({
      layers: ['uiBase', 'uiVariant', 'uiState'],
      tokens: {
        colors: {
          buttonPrimary: 'red',
          buttonSecondary: 'blue',
        },
      },
    });

    expect(layers).toStrictEqual({
      uiBase: 'ui-base',
      uiState: 'ui-state',
      uiVariant: 'ui-variant',
    });
    expect(layersOrder).toStrictEqual(['ui-base', 'ui-variant', 'ui-state']);
  });

  test('getCssText', () => {
    const { getCssText } = createStyleRegistry({
      layers: ['uiBase', 'uiVariant', 'uiState'],
      tokens: {
        colors: {
          buttonPrimary: 'red',
          buttonSecondary: 'blue',
        },
      },
    });

    expect(getCssText()).toBe('@layer ui-base,ui-variant,ui-state;');
  });

  test('getCssText / theme', () => {
    const { getCssText, createTheme } = createStyleRegistry({
      layers: ['uiBase', 'uiVariant', 'uiState'],
      tokens: {
        colors: {
          buttonPrimary: 'red',
          buttonSecondary: 'blue',
        },
      },
    });

    createTheme('light', {});
    expect(getCssText()).toBe(
      '@layer ui-base,ui-variant,ui-state;.light{--colors-button-primary:red;--colors-button-secondary:blue}'
    );
  });
});
