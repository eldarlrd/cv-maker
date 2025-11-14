import { DndContext, type DragEndEvent, closestCenter } from '@dnd-kit/core';
import {
  restrictToParentElement,
  restrictToVerticalAxis
} from '@dnd-kit/modifiers';
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { type ReactElement } from 'react';

import { ListItem } from '@/components/editor/menus/ListItem.tsx';
import { type CertificationDetails } from '@/slices/certificationsSlice.ts';
import { type EducationDetails } from '@/slices/educationSlice.ts';
import { type ExperienceDetails } from '@/slices/experienceSlice.ts';
import { type ProjectDetails } from '@/slices/projectsSlice.ts';

interface ListItemProps {
  id: string;
  name: string;
}

interface ListProps
  extends ExperienceDetails,
    EducationDetails,
    ProjectDetails,
    CertificationDetails {}

interface DndListProps {
  nameKey: string;
  itemArr: ListProps[];
  handleSort: (sortedArr: ListProps[]) => void;
  handleEdit: (id: string) => void;
  handleRemove: (id: string) => void;
}

const DndList = ({
  nameKey,
  itemArr,
  handleSort,
  handleEdit,
  handleRemove
}: DndListProps): ReactElement => {
  // Drag & Drop Sorting
  const onDragEnd = (e: DragEndEvent): void => {
    const { active, over } = e;

    if (active.id !== over?.id) {
      const prevIndex = itemArr.findIndex(item => item.id === active.id);
      const newIndex = itemArr.findIndex(item => item.id === over?.id);

      handleSort(arrayMove(itemArr, prevIndex, newIndex));
    }
  };

  return (
    <>
      {itemArr.length > 0 && (
        <div className='dnd-list'>
          <DndContext
            onDragEnd={onDragEnd}
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis, restrictToParentElement]}>
            <SortableContext
              items={itemArr}
              strategy={verticalListSortingStrategy}>
              {itemArr.map(item => (
                <ListItem
                  key={item.id}
                  item={{
                    id: item.id,
                    name: item[nameKey as keyof ListProps] as string
                  }}
                  handleEdit={() => {
                    handleEdit(item.id);
                  }}
                  handleRemove={() => {
                    handleRemove(item.id);
                  }}
                />
              ))}
            </SortableContext>
          </DndContext>
        </div>
      )}
    </>
  );
};

export { type ListItemProps, type ListProps, DndList };
