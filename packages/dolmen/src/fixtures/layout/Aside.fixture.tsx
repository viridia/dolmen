import { Aside, Button, PageHeader, Spacer } from '../../components';
import { layoutStyle } from './layout.css';

function AsideDemo() {
  return (
    <div class={layoutStyle} style={{ 'flex-direction': 'row' }}>
      <Aside style={{ width: '300px' }}>Aside Panel</Aside>
      <div style={{ flex: 1 }} />
    </div>
  );
}

export default () => <AsideDemo />;
