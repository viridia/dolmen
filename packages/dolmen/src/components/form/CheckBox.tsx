import { JSX, splitProps, ParentComponent } from 'solid-js';

type CheckBoxProps = JSX.InputHTMLAttributes<HTMLInputElement> & {
  indeterminate?: boolean;
};

export const CheckBox: ParentComponent<CheckBoxProps> = props => {
  const [local, rest] = splitProps(props, ['class', 'classList', 'children', 'ref']);
  return (
    <label
      aria-disabled={props.disabled ?? undefined}
      classList={{
        ...local.classList,
        [local.class as string]: !!local.class,
        'dm-checkbox-label': true,
      }}
    >
      <input {...rest} class="dm-checkbox-ctrl" type="checkbox" />
      {local.children}
    </label>
  );
};
