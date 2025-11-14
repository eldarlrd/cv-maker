import { type ReactElement } from 'react';

import { SECTIONS_AZE } from '@/config/translations.ts';
import { LANGUAGES } from '@/slices/languageSlice.ts';
import { useStore } from '@/store.ts';

export const PExperience = (): ReactElement => {
  const section = 'Experience';
  const { experience, language } = useStore();

  const hasExperience = experience.length > 0;
  const isEnglish = language === LANGUAGES.English;

  return (
    <div className='content complex'>
      {hasExperience && (
        <>
          <h1>
            {isEnglish ?
              section.toUpperCase()
            : SECTIONS_AZE[section].toLocaleUpperCase('az')}
          </h1>

          {experience.map(experience => (
            <div key={experience.id}>
              <span>
                <h2>
                  {experience.employer} | {experience.position}
                </h2>

                <h3>
                  {experience.location} | {experience.startDate} -{' '}
                  {experience.endDate || (isEnglish ? 'Present' : 'Hazırda')}
                </h3>
              </span>

              <ul>
                {experience.descriptions.map(description => (
                  <li key={description}>{description.trim()}</li>
                ))}
              </ul>
            </div>
          ))}
        </>
      )}
    </div>
  );
};
