import { registerTemplate } from '../market/register';
import { ClassicVertical } from './ClassicVertical';
import { TowColumns } from './TowColumns';

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