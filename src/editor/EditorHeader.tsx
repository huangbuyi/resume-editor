import { Button, Divider, Flex, GetProp, Popconfirm, Upload, UploadProps, message } from 'antd';
import { printResume } from './print';
import { clearLocalStorage, downloadJSON, loadJSON } from '../resume/store';
import { NavLink } from 'react-router-dom';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

export function EditorHeader() {
  const [messageApi, contextHolder] = message.useMessage();

  const beforeUpload = (file: FileType) => {
    if (file.type !== 'application/json') {
      messageApi.error('只支持打开 JSON 文件');
      return Upload.LIST_IGNORE;
    }
    tryLoadJSON(file);
    return Upload.LIST_IGNORE;
  };

  async function tryLoadJSON(file: FileType) {
    try {
      await loadJSON(file);
      messageApi.success('JSON 文件加载成功');
    } catch (error: unknown) {
      if (typeof error === 'string') {
        messageApi.error(error);
      }
    }
  }

  return (
    <Flex style={{ height: '100%' }} align="center" justify="space-around" gap={8}>
      <Upload beforeUpload={beforeUpload} accept="application/json">
        <Button>打开 JSON</Button>
      </Upload>
      <Button onClick={downloadJSON}>保存为 JSON</Button>
      <Divider type="vertical" />
      <NavLink to="/market">
        <Button type="primary">模板市场 <span style={{ color: 'rgba(255,255,255,.5)' }}>12</span></Button>
      </NavLink>
      <Divider type="vertical" />
      <Button type="primary" onClick={printResume}>打印 / 另存 PDF</Button>

      <Divider type="vertical" style={{ marginLeft: 'auto' }}/>
      <span style={{ color: 'rgba(0,0,0,.5)' }}>本网页不会上传任何用户数据</span>
      <Divider type="vertical" />
      <Popconfirm
        title="清除本地缓存"
        description="清除本地缓存后，将删除用户输入的全部信息，并加载默认示例，确定清除?"
        onConfirm={clearLocalStorage}
        okText="清除"
        cancelText="取消"
      >
        <Button danger>清除缓存</Button>
      </Popconfirm>
      {contextHolder}
    </Flex>
  )
}