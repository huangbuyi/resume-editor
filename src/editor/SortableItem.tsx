import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button, Divider, Flex } from 'antd';
import { DeleteOutlined, MenuOutlined } from '@ant-design/icons';
import styles from './SortableItem.module.css';

interface Props {
  id: string | number;
  children: React.ReactNode;
  onDelete: (id: string | number) => void;
  vertical?: boolean;
}

export function SortableItem(props: Props) {
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
    paddingRight: props.vertical ? undefined : 8
  };

  const buttonStyle = {
    cursor: isDragging ? 'grabbing' : 'grab'
  }
  
  return (
    <li ref={setNodeRef} style={style} className={styles.sortableItem}>
      <Flex style={{ width: '100%' }} align={ props.vertical ? 'end' : 'center' } vertical={props.vertical}>
        <div style={{ flex: 1, width: '100%' }}>
          { props.children }
        </div>
        <Flex style={{ marginLeft: props.vertical ? undefined : 'auto', paddingRight: props.vertical ? 8 : undefined }} gap={8}>
          <Button type="text" icon={<DeleteOutlined />} onClick={() => props.onDelete(props.id)}></Button>
          <Button type="text" icon={<MenuOutlined />} {...attributes} {...listeners} style={buttonStyle}></Button>
        </Flex>
        { props.vertical && <Divider dashed style={{ margin: '8px 0 0' }}></Divider> }
      </Flex>
    </li>
  );
}