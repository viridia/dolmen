import { JSX, splitProps, ParentComponent } from 'solid-js';
import { checkboxInnerStyle, checkboxLabelStyle } from './form.css';

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
      <input {...rest} class={checkboxInnerStyle} type="checkbox" />
      {local.children}
    </label>
  );
};

export default CheckBox;
