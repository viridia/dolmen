import { ParentComponent, JSX, splitProps, Show, createMemo, createUniqueId } from 'solid-js';
import { css, fontSize, styleProps, StyleProps, theme } from '../../styles';
import { FormFieldContext, IInputAriaAttrs, Severity } from './FormFieldContext';
import { FormFieldStatus } from './FormFieldStatus';

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
      success: {},

      info: {},

      warning: {
        [theme.colors.fieldBorder.variable]: theme.colors.warningIcon,
        [theme.colors.fieldBorderSlight.variable]: theme.colors.warningIcon,
      },

      error: {
        [theme.colors.fieldBorder.variable]: theme.colors.errorIcon,
        [theme.colors.fieldBorderSlight.variable]: theme.colors.errorIcon,
      },
    },
  },
});

interface FormFieldProps extends Omit<JSX.HTMLAttributes<HTMLDivElement>, 'title'> {
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
        ...layoutCss,
        [local.class as string]: !!local.class,
        [fieldCss({
          severity: severity(),
        })]: true,
      }}
    >
      <FormFieldContext.Provider value={{ ariaProps }}>
        <Show when={local.title}>
          <label class={fieldTitleCss()} id={titleId()}>
            {local.title}
          </label>
        </Show>
        <Show when={local.description}>
          <div class={fieldDescriptionCss()} id={descriptionId()}>
            {local.description}
          </div>
        </Show>
        {local.children}
        <FormFieldStatus severity={severity()}>{message()}</FormFieldStatus>
      </FormFieldContext.Provider>
    </div>
  );
};
