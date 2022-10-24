import { JSX, splitProps, ParentComponent } from 'solid-js';
import { css, Z } from '../../styles';

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
  boxShadow: `inset 0 1px 3px 1px #00000088`,
  borderWidth: 0,
  borderRadius: 10,
  cursor: 'inherit',
  display: 'block',
  height: '20px',
  fontSize: 'inherit',
  margin: '0 6px 0 0',
  outline: 'none',
  padding: 0,
  position: 'relative',
  transition: 'background-color 0.3s ease',
  width: '36px',

  '&:focus-within:focus-visible': {
    boxShadow: '0 0 1px 3px $colors$focus, inset 0 1px 3px 1px #000000cc',
    zIndex: Z.focused,
  },

  '&:checked': {
    backgroundColor: '$toggleFillChecked',
  },

  '&::after': {
    background: '$toggleSlideFill',
    boxShadow: '0 0.5px 2px 1px $colors$shadow',
    borderRadius: '50%',
    content: '',
    height: '16px',
    left: '2px',
    position: 'absolute',
    top: '2px',
    transition: 'transform 0.3s ease',
    width: '16px',
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
      <input {...rest} class={toggleSwitchCtrlCss()} type="checkbox" role="switch" />
      {local.children}
    </label>
  );
};
