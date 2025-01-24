import { Button, Input, Space } from 'antd';
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

export function InterestsEditor() {
  const { interests, addInterest, removeInterest, setInterests } = useResumeStore();
  const [ newInterestName, setsetNewInterestName ] = useState('');

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over?.id) {
      const oldIndex = interests.findIndex(interest => interest === active.id);
      const newIndex = interests.findIndex(interest => interest === over.id);
      const newInfos = arrayMove(interests, oldIndex, newIndex);
      setInterests(newInfos);
      return true;
    }
  }

  return (
    <>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={interests.map(interest => interest)} strategy={verticalListSortingStrategy}>
          <ul className="sortable-list">
            {interests.map((interest, index) => (
              <SortableItem key={interest} id={interest} onDelete={() => removeInterest(index)}>
                <div style={{ padding: 8 }}>{interest}</div>
              </SortableItem>
            ))}
          </ul>
        </SortableContext>
      </DndContext>
      <Space.Compact style={{ width: '100%', justifyContent: 'right', marginTop: 8 }}>
        <Input value={newInterestName} placeholder="新兴趣爱好" onChange={e => setsetNewInterestName(e.target.value)} style={{ width: '8em' }}/>
        <Button type="primary" htmlType="button" onClick={() => newInterestName && !interests.includes(newInterestName) && addInterest(newInterestName) || setsetNewInterestName('')}>
          新增
        </Button>
      </Space.Compact>
    </>
  )
}