import { JSX } from 'solid-js';
const SvgChevronLeft = (props: JSX.SvgSVGAttributes<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" height={24} width={24} viewBox="0 0 24 24" {...props}>
    <path fill="var(--icon-color)" d="m14 18-6-6 6-6 1.4 1.4-4.6 4.6 4.6 4.6Z" />
  </svg>
);
export default SvgChevronLeft;
