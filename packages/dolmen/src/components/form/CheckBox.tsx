import { JSX, splitProps, ParentComponent } from 'solid-js';
import { checkboxCtrlStyle, checkboxLabelStyle } from './checkbox.css';

interface CheckBoxProps extends JSX.InputHTMLAttributes<HTMLInputElement> {}

export const CheckBox: ParentComponent<CheckBoxProps> = props => {
  const [local, rest] = splitProps(props, [
    'class',
    'classList',
    'children'
  ]);
  return (
    <label
      classList={{
        ...local.classList,
        [local.class]: true,
        [checkboxLabelStyle]: true,
        disabled: props.disabled,
      }}
    >
      <input {...rest} class={checkboxCtrlStyle} type="checkbox" />
      {local.children}
    </label>
  );
};

export default CheckBox;
