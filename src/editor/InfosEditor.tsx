import { Button, Flex, Form, Input, Space } from 'antd';
import { useResumeStore } from '../resume/store';
import { useState } from 'react';
import { DeleteOutlined } from '@ant-design/icons';
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
  const { infos, addInfo, setInfo, removeInfo } = useResumeStore();
  const [ newInfoLabel, setNewInfoLabel ] = useState('');
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = infos.findIndex((info) => info.label === active.id);
      const newIndex = infos.findIndex((info) => info.label === over?.id);
      const newInfos = arrayMove(infos, oldIndex, newIndex);
      console.log(newInfos);
    }
  }

  return (
    <>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={infos.map((_, index) => index)} strategy={verticalListSortingStrategy}>
          {infos.map((info, index) => (
            <SortableItem id={index}>
              <Form.Item key={index} label={info.label}>
                <Flex gap={16}>
                  <Input value={info.value} allowClear onChange={e => setInfo(index, { value: e.target.value })} />
                  <Button type="text" icon={<DeleteOutlined />} onClick={() => removeInfo(index)}></Button>
                </Flex>
              </Form.Item>
            </SortableItem>
          ))}
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