import { Button, Form, Input, Space } from 'antd';
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

export function InfosEditor() {
  const { infos, addInfo, setInfo, setInfos, removeInfo } = useResumeStore();
  const [ newInfoLabel, setNewInfoLabel ] = useState('');

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over?.id) {
      const oldIndex = infos.findIndex(info => info.id === active.id);
      const newIndex = infos.findIndex(info => info.id === over.id);
      const newInfos = arrayMove(infos, oldIndex, newIndex);
      setInfos(newInfos);
      return true;
    }
  }

  return (
    <>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={infos.map(info => info.id)} strategy={verticalListSortingStrategy}>
          <ul className="sortable-list">
            {infos.map((info, index) => (
              <SortableItem key={info.id} id={info.id} onDelete={() => removeInfo(index)}>
                <Form.Item label={info.label}>
                  <Input value={info.value} allowClear onChange={e => setInfo(index, { value: e.target.value })} />
                </Form.Item>
              </SortableItem>
            ))}
          </ul>
        </SortableContext>
      </DndContext>
      <Space.Compact style={{ width: '100%', justifyContent: 'right', marginTop: 8 }}>
        <Input value={newInfoLabel} placeholder="新信息" onChange={e => setNewInfoLabel(e.target.value)} style={{ width: '8em' }}/>
        <Button type="primary" htmlType="button" onClick={() => newInfoLabel && addInfo({ label: newInfoLabel, value: '' })}>
          新增
        </Button>
      </Space.Compact>
    </>
  )
}