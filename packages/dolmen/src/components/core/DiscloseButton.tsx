import { JSX, splitProps, VoidComponent } from 'solid-js';
import { ChevronDown } from '../../icons';

interface DiscloseButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  open?: boolean;
}

export const DiscloseButton: VoidComponent<DiscloseButtonProps> = props => {
  const [local, rest] = splitProps(props, ['open', 'class', 'classList', 'children']);
  return (
    <button
      {...rest}
      classList={{
        ...local.classList,
        [local.class as string]: !!local.class,
        'dm-disclose-button': true,
        'dm-open': !!local.open,
      }}
    >
      <ChevronDown />
    </button>
  );
};
