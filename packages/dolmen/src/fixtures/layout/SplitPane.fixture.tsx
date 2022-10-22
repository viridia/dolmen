import { SplitPane } from '../../components';
import { demoPage } from './demoPage';

export const $category = 'layout';

const FirstChild = () => <div>First Child</div>;
const SecondChild = () => <div>Second Child</div>;
const ThirdChild = () => <div>Third Child</div>;

export default {
  Horizontal: () => {
    return (
      <div class={demoPage()} style={{ 'flex-direction': 'row' }}>
        <SplitPane direction="horizontal">
          <FirstChild />
          <SecondChild />
          <ThirdChild />
        </SplitPane>
      </div>
    );
  },
  'Horizontal (rtl)': () => {
    return (
      <div class={demoPage()} style={{ 'flex-direction': 'row' }} dir="rtl">
        <SplitPane direction="horizontal">
          <FirstChild />
          <SecondChild />
        </SplitPane>
      </div>
    );
  },
  Vertical: () => {
    return (
      <div class={demoPage()} style={{ 'flex-direction': 'row' }}>
        <SplitPane direction="vertical">
          <FirstChild />
          <SecondChild />
          <ThirdChild />
        </SplitPane>
      </div>
    );
  },
  'Vertical - One Child Only': () => {
    return (
      <div class={demoPage()} style={{ 'flex-direction': 'row' }}>
        <SplitPane direction="vertical">
          <FirstChild />
        </SplitPane>
      </div>
    );
  },
};
