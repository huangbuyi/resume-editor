import { Button, Form, Input, Space } from 'antd';
import { useResumeStore } from '../resume/store';
import dayjs from 'dayjs';
import { DateFormat } from '../resume/resume';
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
import DateEditor from './DateEditor';

const { TextArea } = Input;

export function ExperiencesEditor() {
  const { experiences, addExperience, setExperience, removeExperience, setExperiences } = useResumeStore();
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over?.id) {
      const oldIndex = experiences.findIndex(experience => experience.id === active.id);
      const newIndex = experiences.findIndex(experience => experience.id === over.id);
      const newExperiences = arrayMove(experiences, oldIndex, newIndex);
      setExperiences(newExperiences);
      return true;
    }
  }

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
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={experiences.map(experience => experience.id)} strategy={verticalListSortingStrategy}>
          <ul className="sortable-list">
            {experiences.map((experience, index) => (
              <SortableItem key={experience.id} id={experience.id} vertical onDelete={() => removeExperience(index)}>
                <Form.Item label="公司名">
                  <Input value={experience.company} allowClear onChange={e => setExperience(index, { company: e.target.value })} />
                </Form.Item>
                <Form.Item label="职位">
                  <Input value={experience.title} allowClear onChange={e => setExperience(index, { title: e.target.value })} />
                </Form.Item>
                <Form.Item label="时间">
                  <DateEditor startDate={experience.startDate} endDate={experience.endDate} onChange={date => setExperience(index, date)} />
                </Form.Item>
                <Form.Item label="工作内容">
                  <TextArea value={experience.description} allowClear autoSize={{ minRows: 2 }} onChange={e => setExperience(index, { description: e.target.value })} />
                </Form.Item>
              </SortableItem>
            ))}
          </ul>
        </SortableContext>
      </DndContext>
      <Space.Compact style={{ width: '100%', justifyContent: 'flex-end', marginTop: 8 }}>
        <Button type="primary" htmlType="button" onClick={() => addExperience({ company: '', title: '', startDate: getStartDate(), endDate: getEndDate(), description: '' })}>
          新增
        </Button>
      </Space.Compact>
    </>
  )
}
