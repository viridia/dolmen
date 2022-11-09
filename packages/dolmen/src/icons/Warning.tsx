import { JSX } from 'solid-js';

const SvgWarning = (props: JSX.SvgSVGAttributes<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="1em"
    width="1em"
    viewBox="0 0 20 20"
    role="img"
    {...props}
  >
    <path
      fill="var(--icon-color)"
      d="m1 18 9-15 9 15Zm2.646-1.5h12.708L10 5.917Zm6.354-1q.312 0 .531-.219.219-.219.219-.531 0-.312-.219-.531Q10.312 14 10 14q-.312 0-.531.219-.219.219-.219.531 0 .312.219.531.219.219.531.219ZM9.25 13h1.5V9h-1.5Zm.75-1.792Z"
    />
  </svg>
);

export default SvgWarning;
