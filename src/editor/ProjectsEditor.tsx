import { Button, DatePicker, Divider, Flex, Form, Input, Space } from 'antd';
import { useResumeStore } from '../resume/store';
import { DeleteOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { DateFormat } from '../resume/resume';

const { TextArea } = Input;

export function ProjectsEditor() {
  const { projects, addProject, setProject, removeProject } = useResumeStore();

  function getStartDate() {
    const lastProject = projects[projects.length - 1];
    if (lastProject) {
      return dayjs(lastProject.endDate).subtract(1, 'year').format(DateFormat);
    }

    return dayjs().subtract(1, 'year').format(DateFormat);
  }

  function getEndDate() {
    const lastProject = projects[projects.length - 1];
    if (lastProject) {
      return dayjs(lastProject.endDate).format(DateFormat);
    }

    return '';
  }

  return (
    <>
      {projects.map((project, index) => (
        <div key={index}>
          <Form.Item label="项目名">
            <Input value={project.name} allowClear onChange={e => setProject(index, { name: e.target.value })} />
          </Form.Item>
          <Form.Item label="职位">
            <Input value={project.title} allowClear onChange={e => setProject(index, { title: e.target.value })} />
          </Form.Item>
          <Form.Item label="摘要">
            <Input value={project.excerpt} allowClear onChange={e => setProject(index, { excerpt: e.target.value })} />
          </Form.Item>
          <Form.Item label="时间">
            <DatePicker picker="month" placeholder="开始时间" value={dayjs(project.startDate)} onChange={date => setProject(index, { startDate: date.format(DateFormat) })} />
            <DatePicker picker="month" placeholder="至今" allowClear value={project.endDate && dayjs(project.endDate)} onChange={date => setProject(index, { endDate: date &&  date.format(DateFormat) })} style={{ marginLeft: 8 }}/>
          </Form.Item>
          <Form.Item label="工作内容">
            <TextArea value={project.description} allowClear autoSize={{ minRows: 2 }} onChange={e => setProject(index, { description: e.target.value })} />
          </Form.Item>
          <Flex justify="center">
            <Button type="text" icon={<DeleteOutlined />} onClick={() => removeProject(index)}></Button>
          </Flex>
          <Divider dashed style={{ margin: '12px 0' }}></Divider>
        </div>
      ))}
      <Space.Compact style={{ width: '100%', justifyContent: 'right', marginTop: 8 }}>
        <Button type="primary" htmlType="button" onClick={() => addProject({ name: '', title: '', excerpt: '', startDate: getStartDate(), endDate: getEndDate(), description: '' })}>
          新增
        </Button>
      </Space.Compact>
    </>
  )
}
