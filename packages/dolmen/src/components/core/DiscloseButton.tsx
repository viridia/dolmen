import { ParentComponent, JSX, splitProps } from 'solid-js';
import { ChevronDown } from '../../icons';
import { discloseButtonStyle } from './disclose.css';

interface DiscloseButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
}

export const DiscloseButton: ParentComponent<DiscloseButtonProps> = props => {
  const [local, rest] = splitProps(props, ['selected', 'class', 'classList', 'children']);
  return (
    <button
      {...rest}
      classList={{
        ...local.classList,
        [local.class ?? '']: true,
        [discloseButtonStyle]: true,
        selected: !!local.selected,
      }}
    >
      <ChevronDown />
    </button>
  );
};

export default DiscloseButton;
