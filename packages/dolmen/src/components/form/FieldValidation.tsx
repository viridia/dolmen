import { ParentComponent, JSX, splitProps, Show } from 'solid-js';
import { fieldMessageStyle, fieldValidationStyle } from './form.css';

interface FieldValidationProps extends JSX.HTMLAttributes<HTMLDivElement> {
  status?: 'warning' | 'error';
  message?: string;
}

export const FieldValidation: ParentComponent<FieldValidationProps> = props => {
  const [local, rest] = splitProps(props, ['status', 'message', 'class', 'classList', 'children']);

  return (
    <div
      {...rest}
      classList={{
        ...local.classList,
        [local.class]: true,
        [fieldValidationStyle({
          status: local.status,
        })]: true,
      }}
    >
      {local.children}
      <Show when={local.message}>
        <div class={fieldMessageStyle}>{local.message}</div>
      </Show>
    </div>
  );
};

export default FieldValidation;
