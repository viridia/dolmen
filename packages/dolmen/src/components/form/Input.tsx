import { JSX, splitProps, Component, useContext } from 'solid-js';
import { SizeVariant } from '../../styles';
import { FormFieldContext } from './FormFieldContext';

interface InputProps extends JSX.InputHTMLAttributes<HTMLInputElement> {
  adornLeft?: JSX.Element | JSX.Element[];
  adornRight?: JSX.Element | JSX.Element[];
  innerClass?: string;
  innerClassList?: Record<string, boolean>;
  size?: SizeVariant;
  round?: boolean;
}

export const Input: Component<InputProps> = props => {
  const [local, rest] = splitProps(props, [
    'size',
    'round',
    'adornLeft',
    'adornRight',
    'class',
    'classList',
    'innerClass',
    'innerClassList',
  ]);

  const fieldState = useContext(FormFieldContext);
  return (
    <div
      classList={{
        ...local.classList,
        [local.class as string]: !!local.class,
        'dm-disabled': rest.disabled,
        'dm-input-frame': true,
        'dm-round': Boolean(local.round),
        [`dm-size-${local.size}`]: Boolean(local.size),
      }}
    >
      {props.adornLeft && <div class="dm-adorn-left">{props.adornLeft}</div>}
      <input
        {...rest}
        {...fieldState?.ariaProps()}
        classList={{
          ...local.innerClassList,
          [local.innerClass as string]: !!local.innerClass,
          'dm-input-element': true,
        }}
      />
      {props.adornRight && <div class="dm-adorn-right">{props.adornRight}</div>}
    </div>
  );
};
