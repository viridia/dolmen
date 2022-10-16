import { ParentComponent, JSX, splitProps } from 'solid-js';
import { ChevronDown } from '../../icons';
import { css } from '../../styles';

export const discloseButtonCss = css({
  alignItems: 'center',
  appearance: 'none',
  aspectRatio: 1,
  backgroundColor: 'transparent',
  // borderColor: theme.button.subtle.borderColor,
  border: 'none',
  borderRadius: 3,
  // borderWidth: 0,
  // borderStyle: 'solid',
  display: 'flex',
  flexDirection: 'row',
  fontWeight: '500',
  gap: '0.4rem',
  height: '1.5rem',
  justifyContent: 'center',
  outline: 'none',
  padding: 0,
  transform: 'rotate(-90deg)',
  transition: 'transform 0.5s ease',
  width: '1.5rem',
  '--icon-color': '$colors$secondaryContrastDim',

  '&.selected': {
    transform: 'rotate(0)',
  },

  '&:focus:focus-visible': {
    boxShadow: '0 0 1px 3px $colors$focus',
    zIndex: '$focused',
  },

  '&[disabled]': {
    opacity: 0.5,
  },

  '&:hover:not([disabled])': {
    '--icon-color': '$colors$secondaryContrast',
  },
});

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
        [local.class as string]: !!local.class,
        [discloseButtonCss()]: true,
        selected: !!local.selected,
      }}
    >
      <ChevronDown />
    </button>
  );
};
