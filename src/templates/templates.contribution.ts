import { registerTemplate } from '../market/register';
import { ClassicVertical } from './ClassicVertical';
import { TowColumns } from './TowColumns';
import { Sider } from './Sider';
import { MixTowColumns } from './MixTowColumns';
import { Symmetry } from './Symmetry';
import { SymmetryTowColumns } from './SymmetryTowColumns';
import { FullSider } from './FullSider';
import Banner from './banner';
import TeaBlock from './teaBlock';
import PaleGreen from './paleGreen';
import GrassGreen from './grassGreen';
import BlueCream from './blueCream';
import PinkGray from './pinkGray';
import GrayMinimal from './grayMinimal';
import GreenGray from './greenGray';
import WhiteSpace from './whiteSpace';
import JadeLake from './jadeLake';
import PeachMilkTea from './peachMilkTea';
import Turquoise from './turquoise';
import MintyMaple from './mintyMaple';


registerTemplate({
  name: 'MintyMaple',
  title: '薄荷枫叶',
  margin: 0.5,
  columns: 2,
  color: true,
  template: MintyMaple,
});

registerTemplate({
  name: 'Turquoise',
  title: '绿松石',
  margin: [0, 0, 0.5, 0],
  home: 'keepBottom',
  color: true,
  template: Turquoise,
})

registerTemplate({
  name: 'PeachMilkTea',
  title: '蜜桃奶茶',
  margin: [0, 0, 0.5, 0],
  home: 'keepBottom',
  color: true,
  template: PeachMilkTea,
})

registerTemplate({
  name: 'JadeLake',
  title: '翡翠湖',
  margin: 0.75,
  columns: 2,
  color: true,
  template: JadeLake,
});

registerTemplate({
  name: 'WhiteSpace',
  title: '白色空间',
  margin: 0.75,
  template: WhiteSpace,
})

registerTemplate({
  name: 'GreenGray',
  title: '绿色灰色',
  margin: 0,
  home: 'full',
  color: true,
  template: GreenGray,
})

registerTemplate({
  name: 'GrayMinimal',
  title: '灰色极简',
  margin: 0,
  home: 'full',
  color: true,
  template: GrayMinimal
});

registerTemplate({
  name: 'PinkGray',
  title: '粉灰现代',
  margin: 0,
  home: 'full',
  color: true,
  template: PinkGray
})

registerTemplate({
  name: 'BlueCream',
  title: '蓝奶油',
  margin: 0,
  home: 'full',
  color: true,
  template: BlueCream
})

registerTemplate({
  name: 'GrassGreen',
  title: '草绿',
  margin: 0,
  home: 'full',
  color: true,
  template: GrassGreen
})

registerTemplate({
  name: 'PaleGreen',
  title: '浅绿现代',
  margin: 0,
  home: 'full',
  color: true,
  template: PaleGreen
})

registerTemplate({
  name: 'ClassicVertical',
  title: '经典垂直',
  template: ClassicVertical,
});

registerTemplate({
  name: 'TowColumns',
  title: '双栏',
  columns: 2,
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
  columns: 2,
  template: MixTowColumns
})

registerTemplate({
  name: 'Symmetry',
  title: '对称',
  color: true,
  template: Symmetry
})

registerTemplate({
  name: 'SymmetryTowColumns',
  title: '对称双栏',
  columns: 2,
  color: true,
  template: SymmetryTowColumns
})

registerTemplate({
  name: 'FullSider',
  title: '全页侧边栏',
  home: 'full',
  margin: 0.5,
  color: true,
  template: FullSider
})

registerTemplate({
  name: 'Banner',
  title: '横幅',
  home: 'keepBottom',
  margin: [1, 0, 1, 0],
  color: true,
  columns: 2,
  template: Banner
})

registerTemplate({
  name: 'TeaBlock',
  title: '茶色区块',
  home: 'full',
  margin: 0,
  color: true,
  template: TeaBlock
})