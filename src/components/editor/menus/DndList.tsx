import { DndContext, type DragEndEvent, closestCenter } from '@dnd-kit/core';
import { restrictToParentElement, restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import type { ReactElement } from 'react';

import { ListItem } from '@/components/editor/menus/ListItem.tsx';
import type { ListProps } from '%/dndList.model.ts';

interface DndListProps {
  handleEdit: (id: string) => void;
  handleRemove: (id: string) => void;
  handleSort: (sortedArr: ListProps[]) => void;
  itemArr: ListProps[];
  nameKey: string;
}

const DndList = ({
  nameKey,
  itemArr,
  handleSort,
  handleEdit,
  handleRemove,
}: DndListProps): ReactElement => {
  // Drag & Drop Sorting
  const onDragEnd = (e: DragEndEvent): void => {
    const { active, over } = e;

    if (active.id !== over?.id) {
      const prevIndex = itemArr.findIndex((item) => item.id === active.id);
      const newIndex = itemArr.findIndex((item) => item.id === over?.id);

      handleSort(arrayMove(itemArr, prevIndex, newIndex));
    }
  };

  return (
    <>
      {itemArr.length > 0 && (
        <div className='dnd-list'>
          <DndContext
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis, restrictToParentElement]}
            onDragEnd={onDragEnd}>
            <SortableContext items={itemArr} strategy={verticalListSortingStrategy}>
              {itemArr.map((item) => (
                <ListItem
                  handleEdit={(): void => {
                    handleEdit(item.id);
                  }}
                  handleRemove={(): void => {
                    handleRemove(item.id);
                  }}
                  item={{
                    id: item.id,
                    name: item[nameKey as keyof ListProps] as string,
                  }}
                  key={item.id}
                />
              ))}
            </SortableContext>
          </DndContext>
        </div>
      )}
    </>
  );
};

export { DndList };
