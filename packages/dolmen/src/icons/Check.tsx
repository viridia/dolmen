import { JSX } from 'solid-js';

const SvgCheck = (props: JSX.SvgSVGAttributes<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" height={20} width={20} role="img" {...props}>
    <path
      fill="var(--icon-color)"
      d="M8.229 14.729 4 10.5l1.688-1.688 2.541 2.542 6.125-6.104 1.667 1.688Z"
    />
  </svg>
);

export default SvgCheck;
