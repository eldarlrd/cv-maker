import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { faGripVertical, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { ReactElement } from 'react';

import { ACTIONS_ENG } from '#/fields.ts';
import { ACTIONS_AZE } from '#/translations.ts';
import { useStore } from '@/store.ts';
import type { ListItemProps } from '%/dndList.model.ts';
import { LANGUAGES } from '$/languageSlice.ts';

export const ListItem = ({
  item,
  handleEdit,
  handleRemove,
}: {
  item: ListItemProps;
  handleEdit: () => void;
  handleRemove: () => void;
}): ReactElement => {
  const { language } = useStore();
  const id = item.id;

  // Drag & Drop Movement
  const { setNodeRef, listeners, transition, transform, isDragging } = useSortable({
    id,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  const isEnglish = language === LANGUAGES.English;

  return (
    <div
      className={`${isDragging ? 'dragging' : ''} list-item`}
      id={id}
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
          onClick={handleEdit}
          title={isEnglish ? ACTIONS_ENG.edit : ACTIONS_AZE.edit}
          type='button'>
          <FontAwesomeIcon icon={faPencil} />
        </button>

        <button
          id='trash-btn'
          onClick={handleRemove}
          title={isEnglish ? ACTIONS_ENG.remove : ACTIONS_AZE.remove}
          type='button'>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </span>
    </div>
  );
};
