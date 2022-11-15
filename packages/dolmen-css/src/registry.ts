import { camelToKebab } from './kebab';

type EmptyTheme = Record<string, Record<string, string>>;
type DefaultTheme = Record<'colors' | 'size' | 'space', Record<string, string>>;
// type ClassMap = Record<string, string>;

export interface DesignToken {
  variable: string; // --prefix-color-varname
  value: string; // var(--prefix-color-varname)
  computedValue: string;
}

export type TokenGroup<Vars extends Record<string, string>> = {
  [varName in keyof Vars]: DesignToken;
};

export type Tokens<TokenDefs extends EmptyTheme> = {
  [group in keyof TokenDefs]: TokenGroup<TokenDefs[group]>;
};

export type OptionalTokens<TokenDefs extends EmptyTheme> = {
  [group in keyof TokenDefs]?: { [varName in keyof TokenDefs[group]]?: string };
};

export interface Theme<TokenDefs extends EmptyTheme> {
  name: string;
  tokens: Tokens<TokenDefs>;
}

export interface IStyleSystemOptions<Layer extends string, TokenDefs extends EmptyTheme> {
  prefix?: string;
  layers: Layer[];
  tokens: TokenDefs;
}

function designToken(
  prefix: string | undefined,
  group: string,
  name: string,
  defaultValue: string
): DesignToken {
  const variable = prefix
    ? `--${prefix}-${group}-${camelToKebab(name)}`
    : `--${group}-${camelToKebab(name)}`;
  const value = `var(${variable})`;
  return {
    variable,
    value,
    computedValue: defaultValue,
  };
}

interface StyleRegistry<Layer extends string, TokenDefs extends EmptyTheme> {
  tokens: Tokens<TokenDefs>;
  layers: { [key in Layer]?: string };
  layersOrder: string[];
  getCssText(): string;
  createTheme(name: string, tokens: OptionalTokens<TokenDefs>): Theme<TokenDefs>;
  // css(): void
}

export function createStyleRegistry<
  Layer extends string,
  TokenDefs extends EmptyTheme = DefaultTheme
>(options: IStyleSystemOptions<Layer, TokenDefs>): StyleRegistry<Layer, TokenDefs> {
  const tokens: Record<string, Record<string, DesignToken>> = {};
  for (const groupId in options.tokens) {
    const vars = options.tokens[groupId];
    const group: Record<string, DesignToken> = {};
    for (const varName in vars) {
      group[varName] = designToken(options.prefix, groupId, varName, vars[varName]);
    }
    tokens[groupId] = group;
  }

  const layers: { [key in Layer]?: string } = {};
  const layersOrder: string[] = [];
  // const layerClasses: { [key in Layer]?: ClassMap } = {};
  if (options.layers) {
    for (const layerId of options.layers) {
      const layerName = camelToKebab(layerId);
      layers[layerId] = layerName;
      layersOrder.push(layerName);
    }
  }

  const themes: Theme<TokenDefs>[] = [];
  const createTheme = (name: string, overrides: TokenDefs): Theme<TokenDefs> => {
    const themeTokens: Record<string, Record<string, DesignToken>> = { ...tokens };
    for (const groupId in themeTokens) {
      const group = themeTokens[groupId];
      const overrideGroup = overrides[groupId];
      if (group && overrideGroup) {
        // Non-destructive merge
        const newGroup = { ...group } as Record<string, DesignToken>;
        themeTokens[groupId] = newGroup;
        for (const varName in overrideGroup) {
          const oldToken = newGroup[varName];
          if (oldToken) {
            newGroup[varName] = {
              ...oldToken,
              computedValue: overrideGroup[varName],
            };
          }
        }
      }
    }
    const theme: Theme<EmptyTheme> = {
      name,
      tokens: themeTokens,
    };
    themes.push(theme as Theme<TokenDefs>);
    return theme as Theme<TokenDefs>;
  };

  const getCssText = () => {
    const out: string[] = [];
    if (layersOrder.length > 0) {
      out.push(`@layer ${layersOrder.join(',')};`);
    }
    for (const theme of themes) {
      out.push(`.${theme.name}{`);
      const assignments: string[] = [];
      for (const groupId in tokens) {
        for (const tokenId in tokens[groupId]) {
          const token = tokens[groupId][tokenId];
          if (token) {
            assignments.push(`${token.variable}:${token.computedValue}`);
          }
        }
      }
      out.push(assignments.join(';'));
      out.push('}');
    }
    return out.join('');
  };

  const result = {
    tokens: tokens as Tokens<TokenDefs>,
    layers,
    layersOrder,
    getCssText,
    createTheme,
  };

  return result;
}
