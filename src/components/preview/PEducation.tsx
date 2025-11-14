import { type ReactElement } from 'react';

import { SECTIONS_AZE } from '@/config/translations.ts';
import { LANGUAGES } from '@/slices/languageSlice.ts';
import { useStore } from '@/store.ts';

export const PEducation = (): ReactElement => {
  const section = 'Education';
  const { education, language } = useStore();

  const hasEducation = education.length > 0;
  const isEnglish = language === LANGUAGES.English;

  return (
    <div className='content complex'>
      {hasEducation && (
        <>
          <h1>
            {isEnglish ?
              section.toUpperCase()
            : SECTIONS_AZE[section].toLocaleUpperCase('az')}
          </h1>

          {education.map(education => (
            <div key={education.id}>
              <span>
                <h2>{education.college}</h2>

                <h3>
                  {education.startYear} -{' '}
                  {education.endYear || (isEnglish ? 'Present' : 'Hazırda')}
                </h3>
              </span>

              <p>
                {education.major} {education.degree}
              </p>
            </div>
          ))}
        </>
      )}
    </div>
  );
};
