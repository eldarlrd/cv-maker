import { type ReactElement } from 'react';

import { SKILLSETS_ENG } from '@/config/fields.ts';
import { SECTIONS_AZE, SKILLSETS_AZE } from '@/config/translations.ts';
import { LANGUAGES } from '@/slices/languageSlice.ts';
import { useStore } from '@/store.ts';

export const PSkills = (): ReactElement => {
  const section = 'Skills';
  const { skills, language } = useStore();

  const hasSkills = Object.values(skills).some(
    skill => typeof skill === 'string' && skill.trim()
  );

  const isEnglish = language === LANGUAGES.English;

  return (
    <div className='content simple'>
      {hasSkills && (
        <>
          <h1>
            {isEnglish ?
              section.toUpperCase()
            : SECTIONS_AZE[section].toLocaleUpperCase('az')}
          </h1>

          {Object.entries(skills).map(([set, skills]: [string, string]) => (
            <div key={set}>
              {skills.trim() && (
                <>
                  <h2>
                    {isEnglish ?
                      SKILLSETS_ENG[set as keyof typeof SKILLSETS_ENG]
                    : SKILLSETS_AZE[set as keyof typeof SKILLSETS_AZE]}
                  </h2>
                  <p>{skills.trim()}</p>
                </>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
};
