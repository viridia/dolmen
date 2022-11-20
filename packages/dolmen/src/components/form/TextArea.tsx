import { JSX, splitProps, useContext, VoidComponent } from 'solid-js';
import { SizeVariant } from '../../styles';
import { FormFieldContext } from './FormFieldContext';

type TextAreaProps = JSX.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  size?: SizeVariant;
};

export const TextArea: VoidComponent<TextAreaProps> = props => {
  const [local, rest] = splitProps(props, ['size', 'color', 'class', 'classList']);
  const fieldState = useContext(FormFieldContext);
  return (
    <textarea
      {...rest}
      {...fieldState?.ariaProps()}
      disabled={rest.disabled}
      classList={{
        ...local.classList,
        [local.class as string]: !!local.class,
        'dm-textarea': true,
        'dm-disabled': rest.disabled,
        [`dm-size-${local.size}`]: Boolean(local.size),
      }}
    />
  );
};
