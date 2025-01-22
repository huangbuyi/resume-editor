import { Button, DatePicker, Divider, Flex, Form, Input, Space } from 'antd';
import { useResumeStore } from '../resume/store';
import { DeleteOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { DateFormat } from '../resume/resume';

const { TextArea } = Input;

export function ExperiencesEditor() {
  const { experiences, addExperience, setExperience, removeExperience } = useResumeStore();

  function getStartDate() {
    const lastExper = experiences[experiences.length - 1];
    if (lastExper) {
      return dayjs(lastExper.endDate).subtract(1, 'year').format(DateFormat);
    }

    return dayjs().subtract(1, 'year').format(DateFormat);
  }

  function getEndDate() {
    const lastExper = experiences[experiences.length - 1];
    if (lastExper) {
      return dayjs(lastExper.endDate).format(DateFormat);
    }

    return '';
  }

  return (
    <>
      {experiences.map((experience, index) => (
        <div key={index}>
          <Form.Item label="公司名">
            <Input value={experience.company} allowClear onChange={e => setExperience(index, { company: e.target.value })} />
          </Form.Item>
          <Form.Item label="职位">
            <Input value={experience.title} allowClear onChange={e => setExperience(index, { title: e.target.value })} />
          </Form.Item>
          <Form.Item label="时间">
            <DatePicker picker="month" placeholder="开始时间" value={dayjs(experience.startDate)} onChange={date => setExperience(index, { startDate: date.format(DateFormat) })} />
            <DatePicker picker="month" placeholder="至今" allowClear value={experience.endDate && dayjs(experience.endDate)} onChange={date => setExperience(index, { endDate: date &&  date.format(DateFormat) })} style={{ marginLeft: 8 }}/>
          </Form.Item>
          <Form.Item label="工作内容">
            <TextArea value={experience.description} allowClear autoSize={{ minRows: 2 }} onChange={e => setExperience(index, { description: e.target.value })} />
          </Form.Item>
          <Flex justify="center">
            <Button type="text" icon={<DeleteOutlined />} onClick={() => removeExperience(index)}></Button>
          </Flex>
          <Divider dashed style={{ margin: '12px 0' }}></Divider>
        </div>
      ))}
      <Space.Compact style={{ width: '100%', justifyContent: 'right', marginTop: 8 }}>
        <Button type="primary" htmlType="button" onClick={() => addExperience({ company: '', title: '', startDate: getStartDate(), endDate: getEndDate(), description: '' })}>
          新增
        </Button>
      </Space.Compact>
    </>
  )
}
