import { ParentComponent, JSX, splitProps, Show, Switch, Match } from 'solid-js';
import { Error, Info, Success, Warning } from '../../icons';
import { css, space, theme } from '../../styles';
import { Severity } from './FormFieldContext';

const fieldMessageContainerCss = css({
  display: 'flex',
  alignItems: 'start',
  margin: '4px 0',

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
        '--icon-color': theme.colors.warningIcon,
      },

      error: {
        color: theme.colors.errorText,
        '--icon-color': theme.colors.errorIcon,
      },
    },
  },
});

const fieldStatusIconCss = css({
  flexShrink: 0,
  marginRight: space.md,
});

const fieldMessageCss = css({
  flex: '1 1 auto',
  marginTop: '2px',
});

interface FormFieldStatusProps extends JSX.HTMLAttributes<HTMLDivElement> {
  severity?: Severity;
}

export const FormFieldStatus: ParentComponent<FormFieldStatusProps> = props => {
  const [local, rest] = splitProps(props, ['severity', 'children']);

  return (
    <Show when={local.severity && local.children}>
      {() => (
        <div
          {...rest}
          class={fieldMessageContainerCss({
            severity: local.severity,
          })}
        >
          <Switch>
            <Match when={local.severity === 'warning'}>
              <Warning class={fieldStatusIconCss()} />
            </Match>
            <Match when={local.severity === 'error'}>
              <Error class={fieldStatusIconCss()} />
            </Match>
            <Match when={local.severity === 'info'}>
              <Info class={fieldStatusIconCss()} />
            </Match>
            <Match when={local.severity === 'success'}>
              <Success class={fieldStatusIconCss()} />
            </Match>
          </Switch>
          <div class={fieldMessageCss()}>{local.children}</div>
        </div>
      )}
    </Show>
  );
};
