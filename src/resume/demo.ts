export interface DemoOptions {
  name: string;
  local: string;
  title: string;
  url: string;
}

export const demos = [
  {
    name: 'zhangwei',
    local: '张伟',
    title: '产品经理',
    url: 'demos/zhangwei.json'
  },
  {
    name: 'wangxiaomei',
    local: '王小美',
    title: 'UI/UX 设计师',
    url: 'demos/wangxiaomei.json'
  },
]

export function fetchDemo(url: string = demos[0].url) {
  return fetch(url).then(res => res.json());
}