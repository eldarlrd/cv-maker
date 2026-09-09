import { nanoid } from 'nanoid';
import { type ChangeEvent, type ReactElement, useState } from 'react';

import { DndList, type ListProps } from '@/components/editor/menus/DndList.tsx';
import { DrawerButton } from '@/components/editor/menus/DrawerButton.tsx';
import { ACTIONS_ENG, EXPERIENCE_ENG } from '@/config/fields.ts';
import { ACTIONS_AZE, EXPERIENCE_AZE } from '@/config/translations.ts';
import type { ExperienceDetails } from '@/slices/experienceSlice.ts';
import { LANGUAGES } from '@/slices/languageSlice.ts';
import { useStore } from '@/store.ts';

export const EExperience = (): ReactElement => {
  const section = 'Experience';
  const { experience, sortExperience, addExperience, removeExperience, openMenus, language } =
    useStore();
  const isVisible = openMenus.includes(section);

  const [experienceObj, setExperienceObj] = useState<ExperienceDetails>({
    descriptions: [],
    employer: '',
    endDate: '',
    id: '',
    location: '',
    position: '',
    startDate: '',
  });

  const isDisabled =
    !(
      experienceObj.employer &&
      experienceObj.position &&
      experienceObj.location &&
      experienceObj.startDate &&
      experienceObj.descriptions.length > 0
    ) || experienceObj.descriptions.some((desc) => desc.trim() === '');

  const handleExperienceInput = (e: ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = e.target;

    setExperienceObj((prevObj) => ({
      ...prevObj,
      [id]: value,
    }));
  };

  const handleDescriptionsInput = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    const descriptions = e.target.value.split('\n\n');

    setExperienceObj({
      ...experienceObj,
      descriptions,
    });
  };

  const handleAddExperience = (): void => {
    addExperience({
      ...experienceObj,
      id: nanoid(),
    });
    setExperienceObj({
      descriptions: [],
      employer: '',
      endDate: '',
      id: '',
      location: '',
      position: '',
      startDate: '',
    });
  };

  const editExperience = (id: string): void => {
    const experienceToEdit = experience.find((e) => e.id === id);

    if (experienceToEdit) {
      setExperienceObj(experienceToEdit);
      removeExperience(id);
    }
  };

  const isEnglish = language === LANGUAGES.English;

  return (
    <>
      <DrawerButton isVisible={isVisible} section={section} />

      <div className={`${isVisible ? '' : 'closed'} editor-section`}>
        <DndList
          handleEdit={editExperience}
          handleRemove={removeExperience}
          handleSort={sortExperience}
          itemArr={experience as ListProps[]}
          nameKey='employer'
        />

        <div className='two-column'>
          <span>
            <label htmlFor='employer'>
              {isEnglish ? EXPERIENCE_ENG.employer : EXPERIENCE_AZE.employer}
            </label>
            <input
              autoCapitalize='words'
              id='employer'
              maxLength={128}
              minLength={1}
              onInput={handleExperienceInput}
              title=''
              type='text'
              value={experienceObj.employer}
            />
          </span>

          <span>
            <label htmlFor='position'>
              {isEnglish ? EXPERIENCE_ENG.position : EXPERIENCE_AZE.position}
            </label>
            <input
              autoCapitalize='words'
              id='position'
              maxLength={128}
              minLength={1}
              onInput={handleExperienceInput}
              title=''
              type='text'
              value={experienceObj.position}
            />
          </span>
        </div>

        <div className='three-column'>
          <span>
            <label htmlFor='location'>
              {isEnglish ? EXPERIENCE_ENG.location : EXPERIENCE_AZE.location}
            </label>
            <input
              autoCapitalize='words'
              id='location'
              maxLength={128}
              minLength={1}
              onInput={handleExperienceInput}
              title=''
              type='text'
              value={experienceObj.location}
            />
          </span>

          <span>
            <label htmlFor='startDate'>
              {isEnglish ? EXPERIENCE_ENG.startDate : EXPERIENCE_AZE.startDate}
            </label>
            <input
              autoCapitalize='words'
              id='startDate'
              maxLength={64}
              minLength={1}
              onInput={handleExperienceInput}
              title=''
              type='text'
              value={experienceObj.startDate}
            />
          </span>

          <span>
            <label htmlFor='endDate'>
              {isEnglish ? EXPERIENCE_ENG.endDate : EXPERIENCE_AZE.endDate}
            </label>
            <input
              autoCapitalize='words'
              id='endDate'
              maxLength={64}
              minLength={1}
              onInput={handleExperienceInput}
              title=''
              type='text'
              value={experienceObj.endDate}
            />
          </span>
        </div>

        <span>
          <label htmlFor='descriptions'>
            {isEnglish ? EXPERIENCE_ENG.description : EXPERIENCE_AZE.description}
          </label>
          <textarea
            id='descriptions'
            maxLength={4000}
            minLength={1}
            onInput={handleDescriptionsInput}
            rows={6}
            spellCheck={false}
            title=''
            value={experienceObj.descriptions.join('\n\n')}
          />
        </span>

        <button
          className='add-btn'
          disabled={isDisabled}
          onClick={handleAddExperience}
          type='button'>
          {isEnglish ? ACTIONS_ENG.add : ACTIONS_AZE.add}
        </button>
      </div>
    </>
  );
};
