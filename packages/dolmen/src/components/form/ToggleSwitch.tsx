import { JSX, splitProps, ParentComponent } from 'solid-js';
import { css } from '../../styles';

const toggleSwitchLabelCss = css({
  alignItems: 'center',
  borderRadius: '500px',
  color: '$text',
  cursor: 'pointer',
  display: 'flex',
  flex: 1,
  fontFamily: '$body',
  fontSize: 'inherit',
  justifyContent: 'start',
  outline: 'none',

  '&.disabled': {
    cursor: 'default',
    opacity: 0.5,
  },
});

const toggleSwitchCtrlCss = css({
  appearance: 'none',
  backgroundColor: '$toggleFill',
  border: '2px solid $colors$toggleBorder',
  boxShadow: `inset 0 1px 3px 1px #000000cc`,
  borderRadius: 10,
  cursor: 'inherit',
  height: '20px',
  fontSize: 'inherit',
  marginRight: '6px',
  outline: 'none',
  position: 'relative',
  transition: 'background-color 0.3s ease',
  width: '36px',

  '&:focus-within:focus-visible': {
    boxShadow: '0 0 1px 3px $colors$focus, inset 0 1px 3px 1px #000000cc',
    zIndex: '$focused',
  },

  '&:checked': {
    backgroundColor: '$toggleFillChecked',
  },

  '&::after': {
    background: '$toggleSlideFill',
    boxShadow: '0 0 2px 1px $colors$toggleSlideBorder, 0 0.5px 2px 1px $colors$toggleSlideBorder',
    borderRadius: '50%',
    content: '',
    height: '12px',
    left: '2px',
    position: 'absolute',
    top: '2px',
    transition: 'transform 0.3s ease',
    width: '12px',
  },

  '&:checked::after': {
    transform: 'translateX(16px)',
  },
});

interface ToggleSwitchProps extends JSX.InputHTMLAttributes<HTMLInputElement> {}

export const ToggleSwitch: ParentComponent<ToggleSwitchProps> = props => {
  const [local, rest] = splitProps(props, ['class', 'classList', 'children']);
  return (
    <label
      classList={{
        ...local.classList,
        [local.class as string]: !!local.class,
        [toggleSwitchLabelCss()]: true,
        disabled: props.disabled,
      }}
    >
      <input {...rest} class={toggleSwitchCtrlCss()} type="checkbox" />
      {local.children}
    </label>
  );
};
