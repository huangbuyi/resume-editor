import { Form, Input } from 'antd';
import { useResumeStore } from '../resume/store';

const { TextArea } = Input;

export function BasicEditor() {
  const {
    name,
    setName,
    title,
    setTitle,
    introduction,
    setIntroduction
  } = useResumeStore();

  return (
    <>
      <Form.Item label="姓名">
        <Input value={name} onChange={e => setName(e.target.value)} allowClear  style={{ width: '8em' }} />
      </Form.Item>
      <Form.Item label="职位">
        <Input value={title} onChange={e => setTitle(e.target.value)} allowClear  style={{ width: '20em' }} />
      </Form.Item>
      <Form.Item label="简介">
        <TextArea value={introduction} autoSize={{ minRows: 2 }} placeholder="个人简介" allowClear onChange={e => setIntroduction(e.target.value)} />
      </Form.Item>
    </>
  )
}