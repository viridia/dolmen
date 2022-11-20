import { ParentComponent, JSX, splitProps, Show, Switch, Match } from 'solid-js';
import { Error, Info, Success, Warning } from '../../icons';
import { Severity } from './FormFieldContext';

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
          class="dm-form-field-message-container"
        >
          <Switch>
            <Match when={local.severity === 'warning'}>
              <Warning class="dm-form-field-status-icon" />
            </Match>
            <Match when={local.severity === 'error'}>
              <Error class="dm-form-field-status-icon" />
            </Match>
            <Match when={local.severity === 'info'}>
              <Info class="dm-form-field-status-icon" />
            </Match>
            <Match when={local.severity === 'success'}>
              <Success class="dm-form-field-status-icon" />
            </Match>
          </Switch>
          <div class="dm-form-field-message">{local.children}</div>
        </div>
      )}
    </Show>
  );
};
