import { registerTemplate } from '../market/register';
import { ClassicVertical } from './ClassicVertical';
import { TowColumns } from './TowColumns';
import { Sider } from './Sider';

registerTemplate({
  name: 'ClassicVertical',
  title: '经典垂直布局',
  template: ClassicVertical,
});

registerTemplate({
  name: 'TowColumns',
  title: '双栏布局',
  template: TowColumns,
});

registerTemplate({
  name: 'Sider',
  title: '侧边栏',
  template: Sider
})