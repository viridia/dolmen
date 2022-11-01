import { ParentComponent, JSX, splitProps, Show, Switch, Match, createMemo } from 'solid-js';
import { Error, Warning } from '../../icons';
import { css, fontSize, space, styleProps, StyleProps, theme } from '../../styles';

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

const fieldCss = css({
  alignItems: 'stretch',
  display: 'flex',
  flexDirection: 'column',
  fontSize: '0.8rem',

  variants: {
    severity: {
      warning: {
        color: theme.colors.warningText,
        [theme.colors.fieldBorder.variable]: theme.colors.warningIcon,
        [theme.colors.fieldBorderSlight.variable]: theme.colors.warningIcon,
        '--icon-color': theme.colors.warningIcon,
      },

      error: {
        color: theme.colors.errorText,
        [theme.colors.fieldBorder.variable]: theme.colors.errorIcon,
        [theme.colors.fieldBorderSlight.variable]: theme.colors.errorIcon,
        '--icon-color': theme.colors.errorIcon,
      },
    },
  },
});

const fieldMessageContainerCss = css({
  display: 'flex',
  alignItems: 'start',
  marginTop: 2,
});

const fieldStatusIconCss = css({
  flexShrink: 0,
  marginRight: space.md,
});

const fieldMessageCss = css({
  flex: '1 1 auto',
  marginTop: '2px',
});

interface FormFieldProps extends Omit<JSX.HTMLAttributes<HTMLDivElement>, 'title'> {
  severity?: 'warning' | 'error';
  message?: string;
  error?: string;
  warning?: string;
  title?: JSX.Element;
  description?: JSX.Element;
}

export const FormField: ParentComponent<FormFieldProps & StyleProps> = props => {
  const [layoutCss, nprops] = styleProps(props);
  const [local, rest] = splitProps(nprops, [
    'severity',
    'message',
    'error',
    'warning',
    'title',
    'description',
    'class',
    'classList',
    'children',
  ]);

  const severity = createMemo(() => {
    return local.severity
      ? local.severity
      : local.error
      ? 'error'
      : local.warning
      ? 'warning'
      : undefined;
  });
  return (
    <div
      {...rest}
      classList={{
        ...local.classList,
        ...layoutCss,
        [local.class as string]: !!local.class,
        [fieldCss({
          severity: severity(),
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
      <Show when={local.message ?? local.error ?? local.warning} keyed>
        {message => (
          <div class={fieldMessageContainerCss()}>
            <Switch>
              <Match when={severity() === 'warning'}>
                <Warning class={fieldStatusIconCss()} />
              </Match>
              <Match when={severity() === 'error'}>
                <Error class={fieldStatusIconCss()} />
              </Match>
            </Switch>
            <div class={fieldMessageCss()}>{message}</div>
          </div>
        )}
      </Show>
    </div>
  );
};
