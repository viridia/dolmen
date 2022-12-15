import { JSX } from 'solid-js';
const SvgDarkMode = (props: JSX.SvgSVGAttributes<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" height={24} width={24} viewBox="0 0 24 24" {...props}>
    <path
      fill="var(--icon-color)"
      d="M12 21.1q-3.8 0-6.45-2.65Q2.9 15.8 2.9 12q0-3.775 2.662-6.438Q8.225 2.9 12 2.9q.325 0 .65.025T13.3 3q-.95.75-1.525 1.875T11.2 7.3q0 2.3 1.6 3.9t3.9 1.6q1.325 0 2.45-.563 1.125-.562 1.85-1.512.05.3.075.625.025.325.025.65 0 3.775-2.662 6.438Q15.775 21.1 12 21.1Zm0-2.275q2.05 0 3.7-1.1 1.65-1.1 2.45-2.875-.425.1-.862.162-.438.063-.888.038-3.05-.1-5.2-2.225Q9.05 10.7 8.95 7.6q0-.45.05-.888.05-.437.15-.862-1.775.8-2.875 2.45-1.1 1.65-1.1 3.7 0 2.825 2 4.825t4.825 2Zm-.325-6.5Z"
    />
  </svg>
);
export default SvgDarkMode;
