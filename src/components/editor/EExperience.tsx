import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { nanoid } from 'nanoid';
import { type ChangeEvent, type ReactElement, useState } from 'react';

import { ACTIONS_ENG, EXPERIENCE_ENG } from '#/original.ts';
import { ACTIONS_AZE, EXPERIENCE_AZE } from '#/translation.ts';
import { DndList } from '@/components/editor/menus/DndList.tsx';
import { DrawerButton } from '@/components/editor/menus/DrawerButton.tsx';
import { useStore } from '@/store.ts';
import type { ListProps } from '%/dndList.model.ts';
import type { ExperienceDetails } from '$/experienceSlice.ts';
import { LANGUAGES } from '$/languageSlice.ts';

interface ExperienceFieldProps {
  id: string;
  label: string;
  maxLength: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  value: string;
}

const emptyExperience: ExperienceDetails = {
  descriptions: [],
  employer: '',
  endDate: '',
  id: '',
  location: '',
  position: '',
  startDate: '',
};

const ExperienceField = ({
  id,
  label,
  required = false,
  maxLength,
  onChange,
  value,
}: ExperienceFieldProps): ReactElement => (
  <span>
    <label htmlFor={id}>{label}</label>
    <input
      autoCapitalize='words'
      id={id}
      maxLength={maxLength}
      minLength={1}
      onChange={onChange}
      required={required}
      title=''
      type='text'
      value={value}
    />
  </span>
);

export const EExperience = (): ReactElement => {
  const section = 'Experience';
  const { experience, sortExperience, addExperience, removeExperience, openMenus, language } =
    useStore();
  const isVisible = openMenus.includes(section);

  const [experienceObj, setExperienceObj] = useState<ExperienceDetails>(emptyExperience);

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
    setExperienceObj(emptyExperience);
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
          <ExperienceField
            id='employer'
            label={isEnglish ? EXPERIENCE_ENG.employer : EXPERIENCE_AZE.employer}
            maxLength={128}
            onChange={handleExperienceInput}
            required
            value={experienceObj.employer}
          />

          <ExperienceField
            id='position'
            label={isEnglish ? EXPERIENCE_ENG.position : EXPERIENCE_AZE.position}
            maxLength={128}
            onChange={handleExperienceInput}
            required
            value={experienceObj.position}
          />
        </div>

        <div className='three-column'>
          <ExperienceField
            id='location'
            label={isEnglish ? EXPERIENCE_ENG.location : EXPERIENCE_AZE.location}
            maxLength={128}
            onChange={handleExperienceInput}
            required
            value={experienceObj.location}
          />

          <ExperienceField
            id='startDate'
            label={isEnglish ? EXPERIENCE_ENG.startDate : EXPERIENCE_AZE.startDate}
            maxLength={64}
            onChange={handleExperienceInput}
            required
            value={experienceObj.startDate}
          />

          <ExperienceField
            id='endDate'
            label={isEnglish ? EXPERIENCE_ENG.endDate : EXPERIENCE_AZE.endDate}
            maxLength={64}
            onChange={handleExperienceInput}
            value={experienceObj.endDate}
          />
        </div>

        <span>
          <label htmlFor='descriptions'>
            {isEnglish ? EXPERIENCE_ENG.description : EXPERIENCE_AZE.description}
          </label>
          <textarea
            id='descriptions'
            maxLength={4000}
            minLength={1}
            onChange={handleDescriptionsInput}
            required
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
          <FontAwesomeIcon icon={faPlus} /> {isEnglish ? ACTIONS_ENG.add : ACTIONS_AZE.add}
        </button>
      </div>
    </>
  );
};
