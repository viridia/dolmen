import { splitProps } from 'solid-js';
import { css, Spacings } from '../../styles';
import { VariantProps, CSS } from '@stitches/core';

type LayoutStylePropsResult<T extends {}> = [
  { [key: string]: boolean },
  Omit<T, keyof LayoutStyleProps>
];

export function standardLength(prop: keyof CSS): Record<Spacings, CSS> {
  return {
    xl: {
      [prop]: '$space$xl',
    },
    lg: {
      [prop]: '$space$lg',
    },
    md: {
      [prop]: '$space$md',
    },
    sm: {
      [prop]: '$space$sm',
    },
    xs: {
      [prop]: '$space$xs',
    },
    none: {
      [prop]: 0,
    },
  };
}

function standardLength2(prop1: keyof CSS, prop2: keyof CSS): Record<Spacings, CSS> {
  return {
    xl: {
      [prop1]: '$space$xl',
      [prop2]: '$space$xl',
    },
    lg: {
      [prop1]: '$space$lg',
      [prop2]: '$space$lg',
    },
    md: {
      [prop1]: '$space$md',
      [prop2]: '$space$md',
    },
    sm: {
      [prop1]: '$space$sm',
      [prop2]: '$space$sm',
    },
    xs: {
      [prop1]: '$space$xs',
      [prop2]: '$space$xs',
    },
    none: {
      [prop1]: 0,
      [prop2]: 0,
    },
  };
}

// Note: order matters. This needs to come last.
const layoutStyle = css({
  variants: {
    margin: standardLength('margin'),
    marginLeft: standardLength('marginLeft'),
    marginRight: standardLength('marginRight'),
    marginTop: standardLength('marginTop'),
    marginBottom: standardLength('marginBottom'),
    marginX: standardLength2('marginLeft', 'marginRight'),
    marginY: standardLength2('marginTop', 'marginBottom'),
    ml: standardLength('marginLeft'),
    mr: standardLength('marginRight'),
    mt: standardLength('marginTop'),
    mb: standardLength('marginBottom'),
    padding: standardLength('padding'),
    paddingLeft: standardLength('paddingLeft'),
    paddingRight: standardLength('paddingRight'),
    paddingTop: standardLength('paddingTop'),
    paddingBottom: standardLength('paddingBottom'),
    paddingX: standardLength2('paddingLeft', 'paddingRight'),
    paddingY: standardLength2('paddingTop', 'paddingBottom'),
    pl: standardLength('paddingLeft'),
    pr: standardLength('paddingRight'),
    pt: standardLength('paddingTop'),
    pb: standardLength('paddingBottom'),
    gap: standardLength('gap'),

    flexDirection: {
      column: {
        flexDirection: 'column',
      },
      row: {
        flexDirection: 'row',
      },
      columnReverse: {
        flexDirection: 'column-reverse',
      },
      rowReverse: {
        flexDirection: 'row-reverse',
      },
    },

    alignItems: {
      start: {
        alignItems: 'start',
      },
      end: {
        alignItems: 'end',
      },
      stretch: {
        alignItems: 'stretch',
      },
      center: {
        alignItems: 'center',
      },
    },

    alignSelf: {
      start: {
        alignItems: 'start',
      },
      end: {
        alignItems: 'end',
      },
      stretch: {
        alignItems: 'stretch',
      },
      center: {
        alignItems: 'center',
      },
    },

    justifyContent: {
      start: {
        justifyContent: 'start',
      },
      end: {
        justifyContent: 'end',
      },
      flexStart: {
        justifyContent: 'flex-start',
      },
      flexEnd: {
        justifyContent: 'flex-end',
      },
      left: {
        justifyContent: 'left',
      },
      right: {
        justifyContent: 'right',
      },
      center: {
        justifyContent: 'center',
      },
      normal: {
        justifyContent: 'normal',
      },
      spaceBetween: {
        justifyContent: 'space-between',
      },
      spaceAround: {
        justifyContent: 'space-around',
      },
      spaceEvenly: {
        justifyContent: 'space-evenly',
      },
      stretch: {
        justifyContent: 'stretch',
      },
    },
  },
});

/** Utility function to split out the props that are used by the layout recipe. */
export function withLayoutStyle<T extends {}>(
  props: T & LayoutStyleProps
): LayoutStylePropsResult<T> {
  const [lprops, rest] = splitProps(props, [
    'gap',
    'margin',
    'marginLeft',
    'marginRight',
    'marginTop',
    'marginBottom',
    'marginX',
    'marginY',
    'ml',
    'mr',
    'mt',
    'mb',
    'padding',
    'paddingLeft',
    'paddingRight',
    'paddingTop',
    'paddingBottom',
    'paddingX',
    'paddingY',
    'pl',
    'pr',
    'pt',
    'pb',
    'alignItems',
    'alignSelf',
    'justifyContent',
    'flexDirection',
  ]);

  return [
    {
      [layoutStyle(lprops)]: Object.keys(lprops).length > 0,
    },
    rest,
  ];
}

export type LayoutStyleProps = VariantProps<typeof layoutStyle>;
