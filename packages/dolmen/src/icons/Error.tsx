import { JSX } from 'solid-js';
const SvgError = (props: JSX.SvgSVGAttributes<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" height={20} width={20} viewBox="0 0 20 20" {...props}>
    <path
      fill="var(--icon-color)"
      d="M10 14q.312 0 .531-.219.219-.219.219-.531 0-.312-.219-.531-.219-.219-.531-.219-.312 0-.531.219-.219.219-.219.531 0 .312.219.531Q9.688 14 10 14Zm-.75-3h1.5V6h-1.5Zm.75 7q-1.646 0-3.104-.625-1.458-.625-2.552-1.719t-1.719-2.552Q2 11.646 2 10q0-1.667.625-3.115.625-1.447 1.719-2.541Q5.438 3.25 6.896 2.625T10 2q1.667 0 3.115.625 1.447.625 2.541 1.719 1.094 1.094 1.719 2.541Q18 8.333 18 10q0 1.646-.625 3.104-.625 1.458-1.719 2.552t-2.541 1.719Q11.667 18 10 18Zm0-1.5q2.708 0 4.604-1.896T16.5 10q0-2.708-1.896-4.604T10 3.5q-2.708 0-4.604 1.896T3.5 10q0 2.708 1.896 4.604T10 16.5Zm0-6.5Z"
    />
  </svg>
);
export default SvgError;
