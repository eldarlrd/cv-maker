import { type ChangeEvent, type ReactElement } from 'react';

import { DrawerButton } from '@/components/editor/menus/DrawerButton.tsx';
import { SKILLSETS_ENG } from '@/config/fields.ts';
import { SKILLSETS_AZE } from '@/config/translations.ts';
import { LANGUAGES } from '@/slices/languageSlice.ts';
import { useStore } from '@/store.ts';

export const ESkills = (): ReactElement => {
  const section = 'Skills';
  const { skills, setSkill, openMenus, language } = useStore();
  const isVisible = openMenus.includes(section);

  const handleSkillInput = (e: ChangeEvent<HTMLInputElement>): void => {
    setSkill({
      ...skills,
      [e.target.id]: e.target.value
    });
  };

  const isEnglish = language === LANGUAGES.English;

  return (
    <>
      <DrawerButton section={section} isVisible={isVisible} />

      <div className={`${isVisible ? '' : 'closed'} editor-section`}>
        {Object.entries(SKILLSETS_ENG).map(([id, set]) => (
          <span key={id}>
            <label htmlFor={id}>
              {isEnglish ?
                set
              : SKILLSETS_AZE[id as keyof typeof SKILLSETS_AZE]}
            </label>
            <input
              title=''
              id={id}
              type='text'
              minLength={1}
              maxLength={1024}
              value={skills[id as keyof typeof SKILLSETS_ENG]}
              onInput={handleSkillInput}
              autoCapitalize='words'
            />
          </span>
        ))}
      </div>
    </>
  );
};
