import { registerTemplate } from '../market/register';
import { ClassicVertical } from './ClassicVertical';
import { TowColumns } from './TowColumns';
import { Sider } from './Sider';
import { MixTowColumns } from './MixTowColumns';
import { Symmetry } from './Symmetry';
import { SymmetryTowColumns } from './SymmetryTowColumns';

registerTemplate({
  name: 'ClassicVertical',
  title: '经典垂直',
  template: ClassicVertical,
});

registerTemplate({
  name: 'TowColumns',
  title: '双栏',
  template: TowColumns,
});

registerTemplate({
  name: 'Sider',
  title: '侧边栏',
  template: Sider
})

registerTemplate({
  name: 'MixTowColumns',
  title: '混合双栏',
  template: MixTowColumns
})

registerTemplate({
  name: 'Symmetry',
  title: '对称',
  template: Symmetry
})

registerTemplate({
  name: 'SymmetryTowColumns',
  title: '对称',
  template: SymmetryTowColumns
})