import { JSX } from 'solid-js';

const SvgWarning = (props: JSX.SvgSVGAttributes<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" height={24} width={24} role="img" {...props}>
    <path
      fill="var(--icon-color)"
      d="M.825 21.1 12 1.8l11.175 19.3ZM4.6 18.925h14.8L12 6.175Zm7.4-.95q.425 0 .725-.3t.3-.725q0-.425-.3-.725t-.725-.3q-.425 0-.725.3t-.3.725q0 .425.3.725t.725.3ZM11 15h2v-4.925h-2Zm1-2.45Z"
    />
  </svg>
);

export default SvgWarning;
