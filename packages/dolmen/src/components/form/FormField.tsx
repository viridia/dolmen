import { ParentComponent, JSX, splitProps, Show, Switch, Match } from 'solid-js';
import { Error, Warning } from '../../icons';
import { css, fontSize, theme } from '../../styles';

const fieldTitleCss = css({
  font: theme.fonts.title,
  fontSize: fontSize.md,
  fontWeight: 'bold',
  marginBottom: '4px',
  marginTop: '4px',
});

const fieldDescriptionCss = css({
  font: theme.fonts.body,
  fontSize: fontSize.xs,
  marginBottom: '4px',
});

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

interface FieldValidationProps extends Omit<JSX.HTMLAttributes<HTMLDivElement>, 'title'> {
  status?: 'warning' | 'error';
  message?: string;
  title?: JSX.Element;
  description?: JSX.Element;
}

export const FormField: ParentComponent<FieldValidationProps> = props => {
  const [local, rest] = splitProps(props, [
    'status',
    'message',
    'title',
    'description',
    'class',
    'classList',
    'children',
  ]);

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
      <Show when={local.title}>
        <div class={fieldTitleCss()}>{local.title}</div>
      </Show>
      <Show when={local.description}>
        <div class={fieldDescriptionCss()}>{local.description}</div>
      </Show>
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
