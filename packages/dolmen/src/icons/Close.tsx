import { JSX } from 'solid-js';
const SvgClose = (props: JSX.SvgSVGAttributes<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" height={24} width={24} viewBox="0 0 24 24" {...props}>
    <path
      fill="var(--icon-color)"
      d="M6.4 19.45 4.55 17.6l5.6-5.6-5.6-5.6L6.4 4.55l5.6 5.6 5.6-5.6 1.85 1.85-5.6 5.6 5.6 5.6-1.85 1.85-5.6-5.6Z"
    />
  </svg>
);
export default SvgClose;
