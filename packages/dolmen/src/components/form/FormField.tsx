import { ParentComponent, JSX, splitProps, Show, Switch, Match, createMemo } from 'solid-js';
import { Error, Info, Success, Warning } from '../../icons';
import { css, fontSize, space, styleProps, StyleProps, theme } from '../../styles';

const fieldTitleCss = css({
  color: theme.colors.text,
  font: theme.fonts.title,
  fontSize: fontSize.md,
  fontWeight: 'bold',
  marginBottom: '4px',
  marginTop: '4px',
});

const fieldDescriptionCss = css({
  color: theme.colors.textDim,
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
      success: {
        color: theme.colors.successText,
        '--icon-color': theme.colors.successIcon,
      },

      info: {
        color: theme.colors.infoText,
        '--icon-color': theme.colors.infoIcon,
      },

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
  margin: '4px 0',
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
  severity?: 'warning' | 'error' | 'success' | 'info';
  message?: JSX.Element;
  error?: JSX.Element;
  warning?: JSX.Element;
  info?: JSX.Element;
  success?: JSX.Element;
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
    'info',
    'success',
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
      : local.info
      ? 'info'
      : local.success
      ? 'success'
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
      <Show
        when={local.message ?? local.error ?? local.warning ?? local.success ?? local.info}
        keyed
      >
        {message => (
          <div class={fieldMessageContainerCss()}>
            <Switch>
              <Match when={severity() === 'warning'}>
                <Warning class={fieldStatusIconCss()} />
              </Match>
              <Match when={severity() === 'error'}>
                <Error class={fieldStatusIconCss()} />
              </Match>
              <Match when={severity() === 'info'}>
                <Info class={fieldStatusIconCss()} />
              </Match>
              <Match when={severity() === 'success'}>
                <Success class={fieldStatusIconCss()} />
              </Match>
            </Switch>
            <div class={fieldMessageCss()}>{message}</div>
          </div>
        )}
      </Show>
    </div>
  );
};
