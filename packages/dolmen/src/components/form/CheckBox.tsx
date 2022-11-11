import { JSX, splitProps, ParentComponent } from 'solid-js';
import { css, fontSize, Z } from '../../styles';

const checkboxLabelCss = css({
  color: '$text',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'start',
  outline: 'none',
  fontFamily: '$body',
  fontSize: fontSize.md,
  gap: '6px',

  '&.disabled': {
    cursor: 'default',
    opacity: 0.5,
  },
});

const checkboxCtrlCss = css({
  appearance: 'none',
  backgroundColor: '$fieldBg',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: '$fieldBorder',
  borderRadius: 3,
  color: '$btnPrimaryText',
  cursor: 'inherit',
  height: 16,
  fontSize: 'inherit',
  marginRight: 0,
  marginLeft: 0,
  outline: 'none',
  position: 'relative',
  width: 16,

  '&:focus-within:focus-visible': {
    boxShadow: '0 0 1px 3px $colors$focus',
    zIndex: Z.focused,
  },

  '&:checked,&:indeterminate': {
    backgroundColor: '$btnPrimary',
    borderColor: '$btnPrimary',
  },

  '&:checked::after': {
    borderColor: '$btnPrimaryText',
    borderWidth: '0 3px 3px 0',
    borderStyle: 'solid',
    content: '',
    height: '8px',
    left: '3.5px',
    position: 'absolute',
    top: '0.5px',
    transform: 'rotate(35deg) scaleX(0.9)',
    width: '4px',
  },

  '&:indeterminate::after': {
    backgroundColor: '$btnPrimaryText',
    content: '',
    height: '3px',
    left: '3.5px',
    position: 'absolute',
    top: '0.5px',
    width: '4px',
  },
});

type CheckBoxProps = JSX.InputHTMLAttributes<HTMLInputElement> & {
  indeterminate?: boolean,
 };

export const CheckBox: ParentComponent<CheckBoxProps> = props => {
  const [local, rest] = splitProps(props, ['class', 'classList', 'children', 'ref']);
  return (
    <label
      classList={{
        ...local.classList,
        [local.class as string]: !!local.class,
        [checkboxLabelCss()]: true,
        disabled: props.disabled,
      }}
    >
      <input
        {...rest}
        class={checkboxCtrlCss()}
        type="checkbox"
      />
      {local.children}
    </label>
  );
};
