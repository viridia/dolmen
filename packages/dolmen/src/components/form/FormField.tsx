import { ParentComponent, JSX, splitProps, Show, createMemo, createUniqueId } from 'solid-js';
import { FormFieldContext, IInputAriaAttrs, Severity } from './FormFieldContext';
import { FormFieldStatus } from './FormFieldStatus';

interface FormFieldProps extends Omit<JSX.HTMLAttributes<HTMLDivElement>, 'title'> {
  error?: JSX.Element;
  warning?: JSX.Element;
  info?: JSX.Element;
  success?: JSX.Element;
  title?: JSX.Element;
  description?: JSX.Element;
}

export const FormField: ParentComponent<FormFieldProps> = props => {
  const [local, rest] = splitProps(props, [
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

  const severity = createMemo<Severity | undefined>(() => {
    return local.error
      ? 'error'
      : local.warning
      ? 'warning'
      : local.info
      ? 'info'
      : local.success
      ? 'success'
      : undefined;
  });

  const message = createMemo(() => local.error ?? local.warning ?? local.success ?? local.info);
  const titleId = createMemo(() => (local.title ? createUniqueId() : undefined));
  const descriptionId = createMemo(() => (local.description ? createUniqueId() : undefined));
  const messageId = createMemo(() => (message() ? createUniqueId() : undefined));

  const ariaProps = createMemo(() => {
    const result: IInputAriaAttrs = {};
    if (severity() === 'error') {
      result['aria-invalid'] = true;
      if (messageId()) {
        result['aria-errormessage'] = messageId();
      }
    }
    if (titleId()) {
      result['aria-labelledby'] = titleId();
    }
    if (descriptionId()) {
      result['aria-describedby'] = descriptionId();
    }
    return result;
  });

  return (
    <div
      {...rest}
      classList={{
        ...local.classList,
        [local.class as string]: !!local.class,
        'dm-form-field': true,
        [`dm-${severity()}`]: Boolean(severity()),
      }}
    >
      <FormFieldContext.Provider value={{ ariaProps }}>
        <Show when={local.title}>
          <label class="dm-form-field-title" id={titleId()}>
            {local.title}
          </label>
        </Show>
        <Show when={local.description}>
          <div class="dm-form-field-description" id={descriptionId()}>
            {local.description}
          </div>
        </Show>
        {local.children}
        <FormFieldStatus severity={severity()}>{message()}</FormFieldStatus>
      </FormFieldContext.Provider>
    </div>
  );
};
