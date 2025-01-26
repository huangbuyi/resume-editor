import { Button, Divider, Flex } from 'antd';
import { printResume } from './print';

export function EditorHeader() {
  return (
    <Flex style={{ height: '100%' }} align="center" justify="space-around" gap={8}>
      <Button>打开 JSON</Button>
      <Button>保存为 JSON</Button>
      <Divider type="vertical" />
      <Button type="primary">模板市场 <span style={{ color: 'rgba(255,255,255,.5)' }}>12</span></Button>
      <Divider type="vertical" />
      <Button type="primary" onClick={printResume}>打印 / 另存 PDF</Button>

      <Divider type="vertical" style={{ marginLeft: 'auto' }}/>
      <span style={{ color: 'rgba(0,0,0,.5)' }}>本网页不会上传任何用户数据</span>
      <Divider type="vertical" />
      <Button>清除缓存</Button>
    </Flex>
  )
}