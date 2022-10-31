import { ParentComponent, JSX, splitProps, Show, Switch, Match } from 'solid-js';
import { space } from '../../../dist/mjs';
import { Error, Warning } from '../../icons';
import { css, fontSize, styleProps, StyleProps, theme } from '../../styles';

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
    status: {
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
  title?: JSX.Element;
  description?: JSX.Element;
}

export const FormField: ParentComponent<FormFieldProps & StyleProps> = props => {
  const [layoutStyle, nprops] = styleProps(props);
  const [local, rest] = splitProps(nprops, [
    'severity',
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
        ...layoutStyle,
        [local.class as string]: !!local.class,
        [fieldCss({
          status: local.severity,
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
        <div class={fieldMessageContainerCss()}>
          <Switch>
            <Match when={local.severity === 'warning'}>
              <Warning class={fieldStatusIconCss()} />
            </Match>
            <Match when={local.severity === 'error'}>
              <Error class={fieldStatusIconCss()} />
            </Match>
          </Switch>
          <div class={fieldMessageCss()}>{local.message}</div>
        </div>
      </Show>
    </div>
  );
};
