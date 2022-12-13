import { JSX, splitProps, ParentComponent } from 'solid-js';

export const RadioButton: ParentComponent<JSX.InputHTMLAttributes<HTMLInputElement>> = props => {
  const [local, rest] = splitProps(props, ['class', 'classList', 'children', 'ref']);
  return (
    <label
      aria-disabled={props.disabled ?? undefined}
      classList={{
        ...local.classList,
        [local.class as string]: !!local.class,
        'dm-radio-label': true,
      }}
    >
      <input {...rest} class="dm-radio-ctrl" type="radio" />
      {local.children}
    </label>
  );
};
