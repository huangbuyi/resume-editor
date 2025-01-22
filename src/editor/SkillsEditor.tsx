import { Button, Flex, Form, Input, Rate, Space } from 'antd';
import { useResumeStore } from '../resume/store';
import { useState } from 'react';
import { DeleteOutlined } from '@ant-design/icons';

const skillLevels = ['了解', '熟悉', '熟练', '精通', '专家'];

export function SkillsEditor() {
  const { skills, addSkill, setSkill, removeSkill } = useResumeStore();
  const [ newSkillName, setsetNewSkillName ] = useState('');

  return (
    <>
      {skills.map((info, index) => (
        <Form.Item key={index} label={info.name}>
          <Flex gap={16}>
            <Rate tooltips={skillLevels} value={info.level} onChange={level => setSkill(index, { level })} />
            <Button type="text" icon={<DeleteOutlined />} onClick={() => removeSkill(index)} style={{ marginLeft: 'auto' }}></Button>
            </Flex>
        </Form.Item>
      ))}
      <Space.Compact style={{ width: '100%', justifyContent: 'right', marginTop: 8 }}>
        <Input value={newSkillName} placeholder="新技能" onChange={e => setsetNewSkillName(e.target.value)} style={{ width: '8em' }}/>
        <Button type="primary" htmlType="button" onClick={() => newSkillName && addSkill({ name: newSkillName, level: 2 })}>
          新增
        </Button>
      </Space.Compact>
    </>
  )
}