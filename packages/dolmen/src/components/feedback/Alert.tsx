import { VariantProps } from '@stitches/core';
import { ParentComponent, JSX, splitProps, Switch, Match, Show } from 'solid-js';
import { Error, Info, Success, Warning } from '../../icons';
import { css, fontSize, space, theme } from '../../styles';

export const alertCss = css({
  display: 'flex',
  flexDirection: 'row',
  fontSize: fontSize.sm,
  borderRadius: 3,
  backgroundColor: '$elevation2',
  padding: '12px 12px',
  gap: space.lg,

  variants: {
    severity: {
      success: {
        backgroundColor: theme.colors.successBg,
        color: theme.colors.successText,
        '--icon-color': theme.colors.successIcon,
      },
      info: {
        backgroundColor: theme.colors.infoBg,
        color: theme.colors.infoText,
        '--icon-color': theme.colors.infoIcon,
      },
      warning: {
        backgroundColor: theme.colors.warningBg,
        color: theme.colors.warningText,
        '--icon-color': theme.colors.warningIcon,
      },
      error: {
        backgroundColor: theme.colors.errorBg,
        color: theme.colors.errorText,
        '--icon-color': theme.colors.errorIcon,
      },
    },
  },

  defaultVariants: {
    severity: 'error',
  },
});

const alertMessageCss = css({
  flex: 1
});

interface AlertProps {
  /** Allows the alert to be shown conditionally. If false, the alert will not be shown.
      If true or undefined, the alert will be visible.
   */
  when?: boolean;
}

export const Alert: ParentComponent<
  JSX.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertCss> & AlertProps
> = props => {
  const [local, rest] = splitProps(props, ['class', 'classList', 'children', 'severity', 'when']);

  return (
    <Show when={local.when !== false}>
      <div
        {...rest}
        role="alert"
        classList={{
          ...local.classList,
          [local.class as string]: !!local.class,
          [alertCss({
            severity: local.severity,
          })]: true,
        }}
      >
        <Switch>
          <Match when={local.severity === 'success'}>
            <Success />
          </Match>
          <Match when={local.severity === 'info'}>
            <Info />
          </Match>
          <Match when={local.severity === 'warning'}>
            <Warning />
          </Match>
          <Match when={local.severity === 'error'}>
            <Error />
          </Match>
        </Switch>
        <div class={alertMessageCss()}>{local.children}</div>
      </div>
    </Show>
  );
};
