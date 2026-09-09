import { nanoid } from 'nanoid';
import { type ChangeEvent, type ReactElement, useState } from 'react';

import { ACTIONS_ENG, EDUCATION_ENG } from '#/fields.ts';
import { ACTIONS_AZE, EDUCATION_AZE } from '#/translations.ts';
import { DndList } from '@/components/editor/menus/DndList.tsx';
import { DrawerButton } from '@/components/editor/menus/DrawerButton.tsx';
import { useStore } from '@/store.ts';
import type { ListProps } from '%/dndList.model.ts';
import type { EducationDetails } from '$/educationSlice.ts';
import { LANGUAGES } from '$/languageSlice.ts';

export const EEducation = (): ReactElement => {
  const section = 'Education';
  const { education, sortEducation, addEducation, removeEducation, openMenus, language } =
    useStore();
  const isVisible = openMenus.includes(section);

  const [educationObj, setEducationObj] = useState<EducationDetails>({
    college: '',
    degree: '',
    endYear: '',
    id: '',
    major: '',
    startYear: '',
  });

  const isDisabled = !(
    educationObj.college &&
    educationObj.major &&
    educationObj.degree &&
    educationObj.startYear
  );

  const handleEducationInput = (e: ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = e.target;

    setEducationObj((prevObj) => ({
      ...prevObj,
      [id]: value,
    }));
  };

  const handleAddEducation = (): void => {
    addEducation({
      ...educationObj,
      id: nanoid(),
    });
    setEducationObj({
      college: '',
      degree: '',
      endYear: '',
      id: '',
      major: '',
      startYear: '',
    });
  };

  const editEducation = (id: string): void => {
    const educationToEdit = education.find((e) => e.id === id);

    if (educationToEdit) {
      setEducationObj(educationToEdit);
      removeEducation(id);
    }
  };

  const isEnglish = language === LANGUAGES.English;

  return (
    <>
      <DrawerButton isVisible={isVisible} section={section} />

      <div className={`${isVisible ? '' : 'closed'} editor-section`}>
        <DndList
          handleEdit={editEducation}
          handleRemove={removeEducation}
          handleSort={sortEducation}
          itemArr={education as ListProps[]}
          nameKey='major'
        />

        <div className='two-column'>
          <span>
            <label htmlFor='college'>
              {isEnglish ? EDUCATION_ENG.college : EDUCATION_AZE.college}
            </label>
            <input
              autoCapitalize='words'
              id='college'
              maxLength={128}
              minLength={1}
              onInput={handleEducationInput}
              title=''
              type='text'
              value={educationObj.college}
            />
          </span>

          <span>
            <label htmlFor='major'>{isEnglish ? EDUCATION_ENG.major : EDUCATION_AZE.major}</label>
            <input
              autoCapitalize='words'
              id='major'
              maxLength={128}
              minLength={1}
              onInput={handleEducationInput}
              title=''
              type='text'
              value={educationObj.major}
            />
          </span>
        </div>

        <div className='three-column'>
          <span>
            <label htmlFor='degree'>
              {isEnglish ? EDUCATION_ENG.degree : EDUCATION_AZE.degree}
            </label>
            <input
              autoCapitalize='words'
              id='degree'
              maxLength={128}
              minLength={1}
              onInput={handleEducationInput}
              title=''
              type='text'
              value={educationObj.degree}
            />
          </span>

          <span>
            <label htmlFor='startYear'>
              {isEnglish ? EDUCATION_ENG.startYear : EDUCATION_AZE.startYear}
            </label>
            <input
              autoCapitalize='words'
              id='startYear'
              maxLength={64}
              minLength={1}
              onInput={handleEducationInput}
              title=''
              type='text'
              value={educationObj.startYear}
            />
          </span>

          <span>
            <label htmlFor='endYear'>
              {isEnglish ? EDUCATION_ENG.endYear : EDUCATION_AZE.endYear}
            </label>
            <input
              autoCapitalize='words'
              id='endYear'
              maxLength={64}
              minLength={1}
              onInput={handleEducationInput}
              title=''
              type='text'
              value={educationObj.endYear}
            />
          </span>
        </div>

        <button
          className='add-btn'
          disabled={isDisabled}
          onClick={handleAddEducation}
          type='button'>
          {isEnglish ? ACTIONS_ENG.add : ACTIONS_AZE.add}
        </button>
      </div>
    </>
  );
};
