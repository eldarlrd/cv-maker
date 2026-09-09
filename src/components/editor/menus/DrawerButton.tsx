import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { ReactElement } from 'react';

import { SECTIONS_AZE } from '@/config/translations.ts';
import { LANGUAGES } from '@/slices/languageSlice.ts';
import { useStore } from '@/store.ts';

export const DrawerButton = ({
  section,
  isVisible,
}: {
  section: keyof typeof SECTIONS_AZE;
  isVisible: boolean;
}): ReactElement => {
  const { toggleMenu, language } = useStore();

  const toggleVisibility = (): void => {
    toggleMenu(section);
  };

  const isEnglish = language === LANGUAGES.English;

  return (
    <button className='editor-menu' onClick={toggleVisibility} type='button'>
      <h1>{isEnglish ? section : SECTIONS_AZE[section]}</h1>
      <div className={isVisible ? 'open' : ''}>
        <FontAwesomeIcon icon={faChevronDown} size='lg' />
      </div>
    </button>
  );
};
