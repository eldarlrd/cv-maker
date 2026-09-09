import type { ChangeEvent, ReactElement } from 'react';

import { SKILLSETS_ENG } from '#/fields.ts';
import { SKILLSETS_AZE } from '#/translations.ts';
import { DrawerButton } from '@/components/editor/menus/DrawerButton.tsx';
import { useStore } from '@/store.ts';
import { LANGUAGES } from '$/languageSlice.ts';

export const ESkills = (): ReactElement => {
  const section = 'Skills';
  const { skills, setSkill, openMenus, language } = useStore();
  const isVisible = openMenus.includes(section);

  const handleSkillInput = (e: ChangeEvent<HTMLInputElement>): void => {
    setSkill({
      ...skills,
      [e.target.id]: e.target.value,
    });
  };

  const isEnglish = language === LANGUAGES.English;

  return (
    <>
      <DrawerButton isVisible={isVisible} section={section} />

      <div className={`${isVisible ? '' : 'closed'} editor-section`}>
        {Object.entries(SKILLSETS_ENG).map(([id, set]) => (
          <span key={id}>
            <label htmlFor={id}>
              {isEnglish ? set : SKILLSETS_AZE[id as keyof typeof SKILLSETS_AZE]}
            </label>
            <input
              autoCapitalize='words'
              id={id}
              maxLength={1024}
              minLength={1}
              onInput={handleSkillInput}
              title=''
              type='text'
              value={skills[id as keyof typeof SKILLSETS_ENG]}
            />
          </span>
        ))}
      </div>
    </>
  );
};
