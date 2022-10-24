import { ParentComponent, JSX, splitProps, Show, Switch, Match } from 'solid-js';
import { Error, Warning } from '../../icons';
import { css, theme } from '../../styles';

const fieldValidationCss = css({
  alignItems: 'start',
  display: 'flex',
  flexDirection: 'column',
  fontSize: '0.8rem',

  variants: {
    status: {
      warning: {
        color: '#a80',
        [theme.colors.fieldBorder.variable]: '#a80',
        [theme.colors.fieldBorderSlight.variable]: '#a80',
        '--icon-color': '#a80',
      },

      error: {
        color: '#c00',
        [theme.colors.fieldBorder.variable]: '#c00',
        [theme.colors.fieldBorderSlight.variable]: '#c00',
        '--icon-color': '#c00',
      },
    },
  },
});

const fieldMessageCss = css({
  display: 'flex',
  alignItems: 'center',
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
        <div class={fieldMessageCss()}>
          <Switch>
            <Match when={local.status === 'warning'}>
              <Warning />
            </Match>
            <Match when={local.status === 'error'}>
              <Error />
            </Match>
          </Switch>
          {local.message}
        </div>
      </Show>
    </div>
  );
};
