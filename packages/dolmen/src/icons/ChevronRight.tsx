import { JSX } from 'solid-js';

const SvgChevronRight = (props: JSX.SvgSVGAttributes<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" height={24} width={24} role="img" {...props}>
    <path fill="var(--icon-color)" d="M9.4 18 8 16.6l4.6-4.6L8 7.4 9.4 6l6 6Z" />
  </svg>
);

export default SvgChevronRight;
