import { nanoid } from 'nanoid';
import { type ChangeEvent, type ReactElement, useState } from 'react';

import { DndList, type ListProps } from '@/components/editor/menus/DndList.tsx';
import { DrawerButton } from '@/components/editor/menus/DrawerButton.tsx';
import { ACTIONS_ENG, EDUCATION_ENG } from '@/config/fields.ts';
import { ACTIONS_AZE, EDUCATION_AZE } from '@/config/translations.ts';
import { type EducationDetails } from '@/slices/educationSlice.ts';
import { LANGUAGES } from '@/slices/languageSlice.ts';
import { useStore } from '@/store.ts';

export const EEducation = (): ReactElement => {
  const section = 'Education';
  const {
    education,
    sortEducation,
    addEducation,
    removeEducation,
    openMenus,
    language
  } = useStore();
  const isVisible = openMenus.includes(section);

  const [educationObj, setEducationObj] = useState<EducationDetails>({
    id: '',
    college: '',
    major: '',
    degree: '',
    startYear: '',
    endYear: ''
  });

  const isDisabled =
    !educationObj.college ||
    !educationObj.major ||
    !educationObj.degree ||
    !educationObj.startYear;

  const handleEducationInput = (e: ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = e.target;

    setEducationObj(prevObj => ({
      ...prevObj,
      [id]: value
    }));
  };

  const handleAddEducation = (): void => {
    addEducation({
      ...educationObj,
      id: nanoid()
    });
    setEducationObj({
      id: '',
      college: '',
      major: '',
      degree: '',
      startYear: '',
      endYear: ''
    });
  };

  const editEducation = (id: string): void => {
    const educationToEdit = education.find(e => e.id === id);

    if (educationToEdit) {
      setEducationObj(educationToEdit);
      removeEducation(id);
    }
  };

  const isEnglish = language === LANGUAGES.English;

  return (
    <>
      <DrawerButton section={section} isVisible={isVisible} />

      <div className={`${isVisible ? '' : 'closed'} editor-section`}>
        <DndList
          nameKey='major'
          itemArr={education as ListProps[]}
          handleSort={sortEducation}
          handleEdit={editEducation}
          handleRemove={removeEducation}
        />

        <div className='two-column'>
          <span>
            <label htmlFor='college'>
              {isEnglish ? EDUCATION_ENG.college : EDUCATION_AZE.college}
            </label>
            <input
              title=''
              type='text'
              id='college'
              minLength={1}
              maxLength={128}
              value={educationObj.college}
              onInput={handleEducationInput}
              autoCapitalize='words'
            />
          </span>

          <span>
            <label htmlFor='major'>
              {isEnglish ? EDUCATION_ENG.major : EDUCATION_AZE.major}
            </label>
            <input
              title=''
              type='text'
              id='major'
              minLength={1}
              maxLength={128}
              value={educationObj.major}
              onInput={handleEducationInput}
              autoCapitalize='words'
            />
          </span>
        </div>

        <div className='three-column'>
          <span>
            <label htmlFor='degree'>
              {isEnglish ? EDUCATION_ENG.degree : EDUCATION_AZE.degree}
            </label>
            <input
              title=''
              type='text'
              id='degree'
              minLength={1}
              maxLength={128}
              value={educationObj.degree}
              onInput={handleEducationInput}
              autoCapitalize='words'
            />
          </span>

          <span>
            <label htmlFor='startYear'>
              {isEnglish ? EDUCATION_ENG.startYear : EDUCATION_AZE.startYear}
            </label>
            <input
              title=''
              type='text'
              id='startYear'
              minLength={1}
              maxLength={64}
              value={educationObj.startYear}
              onInput={handleEducationInput}
              autoCapitalize='words'
            />
          </span>

          <span>
            <label htmlFor='endYear'>
              {isEnglish ? EDUCATION_ENG.endYear : EDUCATION_AZE.endYear}
            </label>
            <input
              title=''
              type='text'
              id='endYear'
              minLength={1}
              maxLength={64}
              value={educationObj.endYear}
              onInput={handleEducationInput}
              autoCapitalize='words'
            />
          </span>
        </div>

        <button
          type='button'
          className='add-btn'
          onClick={handleAddEducation}
          disabled={isDisabled}>
          {isEnglish ? ACTIONS_ENG.add : ACTIONS_AZE.add}
        </button>
      </div>
    </>
  );
};
