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

export function EducationsEditor() {
  const { educations, addEducation, setEducation, removeEducation, setEducations } = useResumeStore();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over?.id) {
      const oldIndex = educations.findIndex(education => education.id === active.id);
      const newIndex = educations.findIndex(education => education.id === over.id);
      const newEducations = arrayMove(educations, oldIndex, newIndex);
      setEducations(newEducations);
      return true;
    }
  }

  function getStartDate() {
    const lastEducation = educations[educations.length - 1];
    if (lastEducation) {
      return dayjs(lastEducation.startDate || undefined).subtract(4, 'year').format(DateFormat);
    }

    return dayjs().subtract(1, 'year').format(DateFormat);
  }

  function getEndDate() {
    const lastEducation = educations[educations.length - 1];
    if (lastEducation) {
      return dayjs(lastEducation.startDate || undefined).format(DateFormat);
    }

    return '';
  }

  return (
    <>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={educations.map(education => education.id)} strategy={verticalListSortingStrategy}>
          <ul className="sortable-list">
            {educations.map((education, index) => (
              <SortableItem key={education.id} id={education.id} vertical onDelete={() => removeEducation(index)}>
                <Form.Item label="学校/机构">
                  <Input value={education.school} allowClear onChange={e => setEducation(index, { school: e.target.value })} />
                </Form.Item>
                <Form.Item label="学历">
                  <Input value={education.degree} allowClear onChange={e => setEducation(index, { degree: e.target.value })} />
                </Form.Item>
                <Form.Item label="专业">
                  <Input value={education.major} allowClear onChange={e => setEducation(index, { major: e.target.value })} />
                </Form.Item>
                <Form.Item label="时间">
                  <DateEditor startDate={education.startDate} endDate={education.endDate} onChange={date => setEducation(index, date)} />
                </Form.Item>
                <Form.Item label="简介">
                  <TextArea value={education.description} allowClear autoSize={{ minRows: 2 }} onChange={e => setEducation(index, { description: e.target.value })} />
                </Form.Item>
              </SortableItem>
            ))}
          </ul>
        </SortableContext>
      </DndContext>
      <Space.Compact style={{ width: '100%', justifyContent: 'flex-end', marginTop: 8 }}>
        <Button type="primary" htmlType="button" onClick={() => addEducation({ school: '', degree: '', major: '', startDate: getStartDate(), endDate: getEndDate(), description: '' })}>
          新增
        </Button>
      </Space.Compact>
    </>
  )
}
