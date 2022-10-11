import { JSX, splitProps, ParentComponent } from 'solid-js';
import { toggleSwitchCtrlStyle, toggleSwitchLabelStyle } from './form.css';

interface ToggleSwitchProps extends JSX.InputHTMLAttributes<HTMLInputElement> {}

export const ToggleSwitch: ParentComponent<ToggleSwitchProps> = props => {
  const [local, rest] = splitProps(props, ['class', 'classList', 'children']);
  return (
    <label
      classList={{
        ...local.classList,
        [local.class]: true,
        [toggleSwitchLabelStyle]: true,
        disabled: props.disabled,
      }}
    >
      <input {...rest} class={toggleSwitchCtrlStyle} type="checkbox" />
      {local.children}
    </label>
  );
};

export default ToggleSwitch;
