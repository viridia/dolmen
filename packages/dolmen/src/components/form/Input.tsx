import { JSX, splitProps, Component } from 'solid-js';
import {
  adornLeftStyle,
  adornRightStyle,
  inputElementStyle,
  inputFrameStyle,
  InputStyleProps,
} from './input.css';

interface InputProps extends JSX.InputHTMLAttributes<HTMLInputElement> {
  adornLeft?: JSX.Element | JSX.Element[];
  adornRight?: JSX.Element | JSX.Element[];
}

export const Input: Component<InputProps & InputStyleProps> = props => {
  const [local, rest] = splitProps(props, [
    'size',
    'color',
    'round',
    'adornLeft',
    'adornRight',
    'class',
    'classList',
  ]);
  return (
    <div
      classList={{
        ...local.classList,
        [local.class ?? '']: true,
        [inputFrameStyle({
          size: local.size,
          round: local.round,
        })]: true,
      }}
    >
      {props.adornLeft && <div class={adornLeftStyle}>{props.adornLeft}</div>}
      <input {...rest} class={inputElementStyle} />
      {props.adornRight && <div class={adornRightStyle}>{props.adornRight}</div>}
    </div>
  );
};

export default Input;
