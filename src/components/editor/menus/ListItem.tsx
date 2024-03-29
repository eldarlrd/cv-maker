import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { faGripVertical, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { type ReactElement } from 'react';

import { type ListItemProps } from '@/components/editor/menus/DndList.tsx';

export const ListItem = ({
  item,
  handleRemove
}: {
  item: ListItemProps;
  handleRemove: () => void;
}): ReactElement => {
  const id = item.id;

  // Drag & Drop Movement
  const { setNodeRef, listeners, transition, transform, isDragging } =
    useSortable({
      id
    });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform)
  };

  return (
    <div
      id={id}
      className={`${isDragging ? 'dragging' : ''} list-item`}
      ref={setNodeRef}
      style={style}>
      <span>
        <button id='drag-btn' title='Reorder' {...listeners} type='button'>
          <FontAwesomeIcon icon={faGripVertical} />
        </button>

        <h1>{item.name}</h1>
      </span>

      <button
        id='trash-btn'
        title='Remove'
        type='button'
        onClick={handleRemove}>
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </div>
  );
};
