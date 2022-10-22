import { JSX, splitProps, ParentComponent } from 'solid-js';
import { css } from '../../styles';

const checkboxLabelCss = css({
  color: '$text',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'start',
  outline: 'none',
  fontFamily: '$body',
  fontSize: 'inherit',
  gap: '6px',

  '&.disabled': {
    cursor: 'default',
    opacity: 0.5,
  },
});

const checkboxCtrlCss = css({
  appearance: 'none',
  backgroundColor: '$wellBg',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: '$checkboxBorderColor',
  borderRadius: 3,
  color: '$btnPrimaryText',
  cursor: 'inherit',
  height: '18px',
  fontSize: 'inherit',
  marginRight: 0,
  marginLeft: 0,
  outline: 'none',
  position: 'relative',
  width: '18px',

  '&:focus-within:focus-visible': {
    boxShadow: '0 0 1px 3px $colors$focus',
    zIndex: '$focused',
  },

  '&:checked': {
    backgroundColor: '$btnPrimary',
    borderColor: '$btnPrimary',
  },

  '&:checked::after': {
    borderColor: '$btnPrimaryText',
    borderWidth: '0 3px 3px 0',
    borderStyle: 'solid',
    content: '',
    height: '9px',
    left: '4px',
    position: 'absolute',
    top: '0',
    transform: 'rotate(40deg)',
    width: '5px',
  },
});

interface CheckBoxProps extends JSX.InputHTMLAttributes<HTMLInputElement> {}

export const CheckBox: ParentComponent<CheckBoxProps> = props => {
  const [local, rest] = splitProps(props, ['class', 'classList', 'children']);
  return (
    <label
      classList={{
        ...local.classList,
        [local.class as string]: !!local.class,
        [checkboxLabelCss()]: true,
        disabled: props.disabled,
      }}
    >
      <input {...rest} class={checkboxCtrlCss()} type="checkbox" />
      {local.children}
    </label>
  );
};
