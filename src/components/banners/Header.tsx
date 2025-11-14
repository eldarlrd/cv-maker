import { type ReactElement } from 'react';

import { LANGUAGES } from '@/slices/languageSlice.ts';
import { useStore } from '@/store.ts';

export const Header = (): ReactElement => {
  const { language, switchLanguage } = useStore();

  const toggleLanguage = (newLanguage: LANGUAGES): void => {
    switchLanguage(newLanguage);
  };

  return (
    <header>
      <button
        type='button'
        className={language === LANGUAGES.English ? 'active-lang' : ''}
        title='English'
        onClick={() => {
          toggleLanguage(LANGUAGES.English);
        }}>
        🇬🇧
      </button>

      <span>CV Maker</span>

      <button
        type='button'
        className={language === LANGUAGES.Azerbaijani ? 'active-lang' : ''}
        title='Azerbaijani'
        onClick={() => {
          toggleLanguage(LANGUAGES.Azerbaijani);
        }}>
        🇦🇿
      </button>
    </header>
  );
};
