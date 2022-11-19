import { ParentComponent, JSX, splitProps, Switch, Match, Show } from 'solid-js';
import { Error, Info, Success, Warning } from '../../icons';
import { Severity } from '../form';

interface AlertProps {
  /** Allows the alert to be shown conditionally. If false, the alert will not be shown.
      If true or undefined, the alert will be visible.
   */
  when?: boolean;
  severity?: Severity;
}

export const Alert: ParentComponent<JSX.HTMLAttributes<HTMLDivElement> & AlertProps> = props => {
  const [local, rest] = splitProps(props, ['class', 'classList', 'children', 'severity', 'when']);

  return (
    <Show when={local.when !== false}>
      <div
        {...rest}
        role="alert"
        classList={{
          ...local.classList,
          [local.class as string]: !!local.class,
          'dm-alert': true,
          [`dm-${local.severity || 'error'}`]: true,
        }}
      >
        <Switch>
          <Match when={local.severity === 'success'}>
            <Success width={20} />
          </Match>
          <Match when={local.severity === 'info'}>
            <Info width={20} />
          </Match>
          <Match when={local.severity === 'warning'}>
            <Warning width={20} />
          </Match>
          <Match when={local.severity === 'error'}>
            <Error width={20} />
          </Match>
        </Switch>
        <div class="dm-alert-message">{local.children}</div>
      </div>
    </Show>
  );
};
