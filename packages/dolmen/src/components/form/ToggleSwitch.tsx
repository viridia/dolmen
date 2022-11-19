import { JSX, splitProps, ParentComponent } from 'solid-js';

type ToggleSwitchProps = JSX.InputHTMLAttributes<HTMLInputElement>;

export const ToggleSwitch: ParentComponent<ToggleSwitchProps> = props => {
  const [local, rest] = splitProps(props, ['class', 'classList', 'children']);
  return (
    <label
      classList={{
        ...local.classList,
        [local.class as string]: !!local.class,
        'dm-toggle-switch-label': true,
        disabled: props.disabled,
      }}
    >
      <input {...rest} class="dm-toggle-switch-ctrl" type="checkbox" role="switch" />
      {local.children}
    </label>
  );
};
