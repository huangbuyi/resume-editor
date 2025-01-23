import { Button, Form, Input, Rate, Space } from 'antd';
import { useResumeStore } from '../resume/store';
import { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensors,
  useSensor,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableItem } from './SortableItem';

const skillLevels = ['了解', '熟悉', '熟练', '精通', '专家'];

export function SkillsEditor() {
  const { skills, addSkill, setSkill, removeSkill, setSkills } = useResumeStore();
  const [ newSkillName, setsetNewSkillName ] = useState('');

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over?.id) {
      const oldIndex = skills.findIndex(skill => skill.id === active.id);
      const newIndex = skills.findIndex(skill => skill.id === over.id);
      const newInfos = arrayMove(skills, oldIndex, newIndex);
      setSkills(newInfos);
      return true;
    }
  }

  return (
    <>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={skills.map(skill => skill.id)} strategy={verticalListSortingStrategy}>
          <ul className="sortable-list">
            {skills.map((skill, index) => (
              <SortableItem key={skill.id} id={skill.id} onDelete={() => removeSkill(index)}>
                <Form.Item key={index} label={skill.name}>
                  <Rate tooltips={skillLevels} value={skill.level} onChange={level => setSkill(index, { level })} />
                </Form.Item>
              </SortableItem>
            ))}
          </ul>
        </SortableContext>
      </DndContext>
      <Space.Compact style={{ width: '100%', justifyContent: 'right', marginTop: 8 }}>
        <Input value={newSkillName} placeholder="新技能" onChange={e => setsetNewSkillName(e.target.value)} style={{ width: '8em' }}/>
        <Button type="primary" htmlType="button" onClick={() => newSkillName && addSkill({ name: newSkillName, level: 2 })}>
          新增
        </Button>
      </Space.Compact>
    </>
  )
}