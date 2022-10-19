import { ParentComponent, JSX, splitProps, Show } from 'solid-js';
import { css } from '../../styles';

const fieldValidationCss = css({
  alignItems: 'start',
  display: 'flex',
  flexDirection: 'column',
  fontSize: '0.8rem',

  variants: {
    status: {
      warning: {
        color: '#a80',
      },

      error: {
        color: '#c00',
      },
    },
  },
});

const fieldMessageCss = css({
  marginTop: 2,
});

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
        [local.class as string]: !!local.class,
        [fieldValidationCss({
          status: local.status,
        })]: true,
      }}
    >
      {local.children}
      <Show when={local.message}>
        <div class={fieldMessageCss()}>{local.message}</div>
      </Show>
    </div>
  );
};
