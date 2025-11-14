import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  faGripVertical,
  faPencil,
  faTrash
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { type ReactElement } from 'react';

import { type ListItemProps } from '@/components/editor/menus/DndList.tsx';
import { ACTIONS_ENG } from '@/config/fields.ts';
import { ACTIONS_AZE } from '@/config/translations.ts';
import { LANGUAGES } from '@/slices/languageSlice.ts';
import { useStore } from '@/store.ts';

export const ListItem = ({
  item,
  handleEdit,
  handleRemove
}: {
  item: ListItemProps;
  handleEdit: () => void;
  handleRemove: () => void;
}): ReactElement => {
  const { language } = useStore();
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

  const isEnglish = language === LANGUAGES.English;

  return (
    <div
      id={id}
      className={`${isDragging ? 'dragging' : ''} list-item`}
      ref={setNodeRef}
      style={style}>
      <span>
        <button
          id='drag-btn'
          title={isEnglish ? ACTIONS_ENG.reorder : ACTIONS_AZE.reorder}
          {...listeners}
          type='button'>
          <FontAwesomeIcon icon={faGripVertical} />
        </button>

        <h1>{item.name}</h1>
      </span>

      <span>
        <button
          id='edit-btn'
          title={isEnglish ? ACTIONS_ENG.edit : ACTIONS_AZE.edit}
          type='button'
          onClick={handleEdit}>
          <FontAwesomeIcon icon={faPencil} />
        </button>

        <button
          id='trash-btn'
          title={isEnglish ? ACTIONS_ENG.remove : ACTIONS_AZE.remove}
          type='button'
          onClick={handleRemove}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </span>
    </div>
  );
};
