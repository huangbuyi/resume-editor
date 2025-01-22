import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button, Flex } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import styles from './SortableItem.module.css';

export function SortableItem(props: { id: string | number, children: React.ReactNode }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({id: props.id});
  
  const style = {
    transform: CSS.Transform.toString(transform),
    boxShadow: isDragging ? 'rgba(0, 0, 0, 0.1) 0px 2px 6px, rgba(0, 0, 0, 0.1) 0px 4px 12px' : undefined,
    zIndex: isDragging ? 9999 : 0,
    transition,
  };

  const buttonStyle = {
    cursor: isDragging ? 'grabbing' : 'grab',
  }
  
  return (
    <li ref={setNodeRef} style={style} className={styles.sortableItem}>
      <Flex style={{ width: '100%' }} align='center'>
        <div style={{flex: 1}}>
          { props.children }
        </div>
        <Button type="text" icon={<MenuOutlined />} {...attributes} {...listeners} style={buttonStyle}></Button>
      </Flex>
    </li>
  );
}