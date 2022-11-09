import { JSX } from 'solid-js';

const SvgChevronDown = (props: JSX.SvgSVGAttributes<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="1em"
    width="1em"
    viewBox="0 0 24 24"
    role="img"
    {...props}
  >
    <path fill="var(--icon-color)" d="m12 15.375-6-6 1.4-1.4 4.6 4.6 4.6-4.6 1.4 1.4Z" />
  </svg>
);

export default SvgChevronDown;
