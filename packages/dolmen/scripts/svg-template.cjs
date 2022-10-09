// Custom template for svgr to convert icons to Solid components.
module.exports = (variables, { tpl }) => {
  return tpl`
import { JSX } from 'solid-js';
${variables.interfaces};

const ${variables.componentName} = (props: JSX.SvgSVGAttributes<SVGSVGElement>) => (
  ${variables.jsx}
);

${variables.exports};
`;
};
