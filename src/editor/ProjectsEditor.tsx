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

export function ProjectsEditor() {
  const { projects, addProject, setProject, removeProject, setProjects } = useResumeStore();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over?.id) {
      const oldIndex = projects.findIndex(project => project.id === active.id);
      const newIndex = projects.findIndex(project => project.id === over.id);
      const newProjects = arrayMove(projects, oldIndex, newIndex);
      setProjects(newProjects);
      return true;
    }
  }

  function getStartDate() {
    const lastProject = projects[projects.length - 1];
    if (lastProject) {
      console.log(dayjs);
      return dayjs(lastProject.startDate || undefined).subtract(1, 'year').format(DateFormat);
    }

    return dayjs().subtract(1, 'year').format(DateFormat);
  }

  function getEndDate() {
    const lastProject = projects[projects.length - 1];
    if (lastProject) {
      return dayjs(lastProject.startDate || undefined).format(DateFormat);
    }

    return '';
  }

  return (
    <>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={projects.map(project => project.id)} strategy={verticalListSortingStrategy}>
          <ul className="sortable-list">
            {projects.map((project, index) => (
              <SortableItem key={project.id} id={project.id} vertical onDelete={() => removeProject(index)}>
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
                  <DateEditor startDate={project.startDate} endDate={project.endDate} onChange={date => setProject(index, date)} />
                </Form.Item>
                <Form.Item label="工作内容">
                  <TextArea value={project.description} allowClear autoSize={{ minRows: 2 }} onChange={e => setProject(index, { description: e.target.value })} />
                </Form.Item>
              </SortableItem>
            ))}
          </ul>
        </SortableContext>
      </DndContext>
      <Space.Compact style={{ width: '100%', justifyContent: 'flex-end', marginTop: 8 }}>
        <Button type="primary" htmlType="button" onClick={() => addProject({ name: '', title: '', excerpt: '', startDate: getStartDate(), endDate: getEndDate(), description: '' })}>
          新增
        </Button>
      </Space.Compact>
    </>
  )
}
