import { nanoid } from 'nanoid';
import { useState, type ReactElement, type ChangeEvent } from 'react';

import { DndList, type ListProps } from '@/components/editor/menus/DndList.tsx';
import { DrawerButton } from '@/components/editor/menus/DrawerButton.tsx';
import { ACTIONS_ENG, EXPERIENCE_ENG } from '@/config/fields.ts';
import { ACTIONS_AZE, EXPERIENCE_AZE } from '@/config/translations.ts';
import { type ExperienceDetails } from '@/slices/experienceSlice.ts';
import { LANGUAGES } from '@/slices/languageSlice.ts';
import { useStore } from '@/store.ts';

export const EExperience = (): ReactElement => {
  const section = 'Experience';
  const {
    experience,
    sortExperience,
    addExperience,
    removeExperience,
    openMenus,
    language
  } = useStore();
  const isVisible = openMenus.includes(section);

  const [experienceObj, setExperienceObj] = useState<ExperienceDetails>({
    id: '',
    employer: '',
    position: '',
    location: '',
    startDate: '',
    endDate: '',
    descriptions: []
  });

  const isDisabled =
    !experienceObj.employer ||
    !experienceObj.position ||
    !experienceObj.location ||
    !experienceObj.startDate ||
    !(experienceObj.descriptions.length > 0) ||
    experienceObj.descriptions.some(desc => desc.trim() === '');

  const handleExperienceInput = (e: ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = e.target;

    setExperienceObj(prevObj => ({
      ...prevObj,
      [id]: value
    }));
  };

  const handleDescriptionsInput = (
    e: ChangeEvent<HTMLTextAreaElement>
  ): void => {
    const descriptions = e.target.value.split('\n\n');

    setExperienceObj({
      ...experienceObj,
      descriptions
    });
  };

  const handleAddExperience = (): void => {
    addExperience({
      ...experienceObj,
      id: nanoid()
    });
    setExperienceObj({
      id: '',
      employer: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      descriptions: []
    });
  };

  const editExperience = (id: string): void => {
    const experienceToEdit = experience.find(e => e.id === id);

    if (experienceToEdit) {
      setExperienceObj(experienceToEdit);
      removeExperience(id);
    }
  };

  const isEnglish = language === LANGUAGES.English;

  return (
    <>
      <DrawerButton section={section} isVisible={isVisible} />

      <div className={`${isVisible ? '' : 'closed'} editor-section`}>
        <DndList
          nameKey='employer'
          itemArr={experience as ListProps[]}
          handleSort={sortExperience}
          handleEdit={editExperience}
          handleRemove={removeExperience}
        />

        <div className='two-column'>
          <span>
            <label htmlFor='employer'>
              {isEnglish ? EXPERIENCE_ENG.employer : EXPERIENCE_AZE.employer}
            </label>
            <input
              title=''
              type='text'
              id='employer'
              minLength={1}
              maxLength={128}
              value={experienceObj.employer}
              onInput={handleExperienceInput}
              autoCapitalize='words'
            />
          </span>

          <span>
            <label htmlFor='position'>
              {isEnglish ? EXPERIENCE_ENG.position : EXPERIENCE_AZE.position}
            </label>
            <input
              title=''
              type='text'
              id='position'
              minLength={1}
              maxLength={128}
              value={experienceObj.position}
              onInput={handleExperienceInput}
              autoCapitalize='words'
            />
          </span>
        </div>

        <div className='three-column'>
          <span>
            <label htmlFor='location'>
              {isEnglish ? EXPERIENCE_ENG.location : EXPERIENCE_AZE.location}
            </label>
            <input
              title=''
              type='text'
              id='location'
              minLength={1}
              maxLength={128}
              value={experienceObj.location}
              onInput={handleExperienceInput}
              autoCapitalize='words'
            />
          </span>

          <span>
            <label htmlFor='startDate'>
              {isEnglish ? EXPERIENCE_ENG.startDate : EXPERIENCE_AZE.startDate}
            </label>
            <input
              title=''
              type='text'
              id='startDate'
              minLength={1}
              maxLength={64}
              value={experienceObj.startDate}
              onInput={handleExperienceInput}
              autoCapitalize='words'
            />
          </span>

          <span>
            <label htmlFor='endDate'>
              {isEnglish ? EXPERIENCE_ENG.endDate : EXPERIENCE_AZE.endDate}
            </label>
            <input
              title=''
              type='text'
              id='endDate'
              minLength={1}
              maxLength={64}
              value={experienceObj.endDate}
              onInput={handleExperienceInput}
              autoCapitalize='words'
            />
          </span>
        </div>

        <span>
          <label htmlFor='descriptions'>
            {isEnglish ?
              EXPERIENCE_ENG.description
            : EXPERIENCE_AZE.description}
          </label>
          <textarea
            title=''
            rows={6}
            minLength={1}
            maxLength={4000}
            id='descriptions'
            spellCheck={false}
            value={experienceObj.descriptions.join('\n\n')}
            onInput={handleDescriptionsInput}
          />
        </span>

        <button
          type='button'
          className='add-btn'
          onClick={handleAddExperience}
          disabled={isDisabled}>
          {isEnglish ? ACTIONS_ENG.add : ACTIONS_AZE.add}
        </button>
      </div>
    </>
  );
};
