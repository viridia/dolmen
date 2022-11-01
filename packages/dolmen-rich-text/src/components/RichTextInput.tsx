import { createSignal, JSX, splitProps, VoidComponent } from 'solid-js';
import { VariantProps } from '@stitches/core';
import {
  css,
  fontSize,
  SizeVariant,
  scrollbars,
  styleProps,
  LayoutProps,
  Button,
  ButtonGroup,
} from 'dolmen';
import { schema } from 'prosemirror-schema-basic';
import { undo, redo, history } from 'prosemirror-history';
import { keymap } from 'prosemirror-keymap';
import { baseKeymap, toggleMark } from 'prosemirror-commands';
import { NodeType } from 'prosemirror-model';
import { inputRules, textblockTypeInputRule, emDash, ellipsis } from 'prosemirror-inputrules';
import { gapCursor } from 'prosemirror-gapcursor';
import { createProseMirror } from '../hooks';

interface RichTextEditProps extends JSX.HTMLAttributes<HTMLDivElement> {
  defaultValue: string;
}

const inputSize = (base: SizeVariant) => ({
  fontSize: fontSize[base],
});

const rtInputCss = css(
  {
    backgroundColor: '$fieldBg',
    color: '$text',
    alignItems: 'stretch',
    borderRadius: 3,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '$fieldBorderSlight',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: '$body',
    fontWeight: '350',
    fontSize: fontSize.md,
    outline: 'none',
    overflowY: 'auto',
    padding: '6px',
    '--icon-color': '$colors$textDim',

    '&:hover:not([disabled])': {
      borderColor: '$fieldHoverBorder',
    },

    '&:focus-within': {
      boxShadow: '0 0 0 2px inset $colors$focus',
    },

    '& ::selection': {
      background: '$textSelectionBg',
      color: '$textSelection',
    },

    '&[disabled]': {
      opacity: 0.5,
    },

    '& > .ProseMirror': {
      flex: 1,
      outline: 'none',
      border: 'none',
    },

    '& p:first-child': {
      marginTop: 0,
    },

    '& p:last-child': {
      marginBottom: 0,
    },

    '& code': {
      fontFamily: '$mono',
      // fontSize: '1rem',
      // color: 'black',
      // backgroundColor: 'white',
      // padding: '4px',
    },

    '& pre': {
      // fontFamily: '$mono',
      // fontSize: '1rem',
      color: 'black',
      backgroundColor: 'white',
      // padding: '4px',
    },

    '& .ProseMirror-gapcursor': {
      display: 'none',
      pointerEvents: 'none',
      position: 'absolute',
    },

    '& .ProseMirror-gapcursor:after': {
      content: '',
      display: 'block',
      position: 'absolute',
      top: '-2px',
      width: '20px',
      borderTop: '1px solid black',
      // animation: ProseMirror-cursor-blink 1.1s steps(2, start) infinite;
    },

    // @keyframes ProseMirror-cursor-blink {
    //   to {
    //     visibility: hidden;
    //   }
    // }

    '& .ProseMirror-focused .ProseMirror-gapcursor': {
      display: 'block',
    },

    variants: {
      size: {
        xl: inputSize('xl'),
        lg: inputSize('lg'),
        md: inputSize('md'),
        sm: inputSize('sm'),
        xs: inputSize('xs'),
      },
    },
  },
  scrollbars
);

export function codeBlockRule(nodeType: NodeType) {
  return textblockTypeInputRule(/^```$/, nodeType);
}

// const globalStyles = globalCss({
//   '@import': ['prosemirror-view/styles/prosemirror.css'],
// });

// const mySchema = new Schema({ nodes: schema.nodes, marks: schema.marks });

export const RichTextInput: VoidComponent<
  RichTextEditProps & LayoutProps & VariantProps<typeof rtInputCss>
> = props => {
  const [layoutCss, nprops] = styleProps(props);
  const [local, rest] = splitProps(nprops, ['size', 'class', 'classList']);
  const [ref, setRef] = createSignal<HTMLElement>();

  // globalStyles();

  const { editorView, isMarkActive } = createProseMirror(ref, schema, [
    inputRules({ rules: [ellipsis, emDash, codeBlockRule(schema.nodes.code_block)] }),
    history(),
    keymap({
      'Mod-z': undo,
      'Mod-y': redo,
      'Mod-b': toggleMark(schema.marks.strong),
      'Mod-B': toggleMark(schema.marks.strong),
      'Mod-i': toggleMark(schema.marks.em),
      'Mod-I': toggleMark(schema.marks.em),
      'Mod-`': toggleMark(schema.marks.code),
    }),
    keymap(baseKeymap),
    gapCursor(),
  ]);

  const isBold = isMarkActive(schema.marks.strong);
  const isItalic = isMarkActive(schema.marks.em);
  const isCode = isMarkActive(schema.marks.code);

  return (
    <>
      <ButtonGroup>
        <Button
          icon
          selected={isBold()}
          onClick={() => {
            const view = editorView();
            if (view) {
              toggleMark(schema.marks.strong)(view.state, view.dispatch);
              view.focus();
            }
          }}
        >
          <strong>B</strong>
        </Button>
        <Button
          icon
          selected={isItalic()}
          onClick={() => {
            const view = editorView();
            if (view) {
              toggleMark(schema.marks.em)(view.state, view.dispatch);
              view.focus();
            }
          }}
        >
          <em>I</em>
        </Button>
        <Button
          icon
          selected={isCode()}
          onClick={() => {
            const view = editorView();
            if (view) {
              toggleMark(schema.marks.code)(view.state, view.dispatch);
              view.focus();
            }
          }}
        >
          [c]
        </Button>
      </ButtonGroup>
      <div
        ref={setRef}
        {...rest}
        classList={{
          ...local.classList,
          ...layoutCss,
          [local.class as string]: !!local.class,
          [rtInputCss({
            size: local.size,
          })]: true,
        }}
      />
    </>
  );
};
