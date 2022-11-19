import { Aside } from '../../components';
import './demo.scss';

export const $category = 'layout';

function AsideDemo() {
  return (
    <div class="demopage" style={{ 'flex-direction': 'row' }}>
      <Aside style={{ width: '300px' }}>Aside Panel</Aside>
      <div style={{ flex: 1 }} />
    </div>
  );
}

export default () => <AsideDemo />;
