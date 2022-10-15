import { SplitPane } from '../../components';
import { layoutStyle } from './layout.css';

export const $category = 'layout';

const FirstChild = () => <div>First Child</div>;
const SecondChild = () => <div>Second Child</div>;

export default {
  Horizontal: () => {
    return (
      <div class={layoutStyle} style={{ 'flex-direction': 'row' }}>
        <SplitPane direction="horizontal" first={<FirstChild />} second={<SecondChild />} />
      </div>
    );
  },
  'Horizontal (rtl)': () => {
    return (
      <div class={layoutStyle} style={{ 'flex-direction': 'row' }} dir="rtl">
        <SplitPane direction="horizontal" first={<FirstChild />} second={<SecondChild />} />
      </div>
    );
  },
  Vertical: () => {
    return (
      <div class={layoutStyle} style={{ 'flex-direction': 'row' }}>
        <SplitPane direction="vertical" first={<FirstChild />} second={<SecondChild />} />
      </div>
    );
  },
  'Vertical - First Child Only': () => {
    return (
      <div class={layoutStyle} style={{ 'flex-direction': 'row' }}>
        <SplitPane direction="vertical" first={<FirstChild />} />
      </div>
    );
  },
  'Vertical - Second Child Only': () => {
    return (
      <div class={layoutStyle} style={{ 'flex-direction': 'row' }}>
        <SplitPane direction="vertical" second={<SecondChild />} />
      </div>
    );
  },
};
