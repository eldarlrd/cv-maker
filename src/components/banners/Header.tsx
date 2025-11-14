import { type ReactElement } from 'react';

import { LANGUAGES } from '@/slices/languageSlice.ts';
import { useStore } from '@/store.ts';

export const Header = (): ReactElement => {
  const { language, switchLanguage } = useStore();

  const toggleLanguage = (newLanguage: LANGUAGES): void => {
    switchLanguage(newLanguage);
  };

  const isEnglish = language === LANGUAGES.English;

  return (
    <header>
      <button
        type='button'
        className={isEnglish ? 'active-lang' : ''}
        title='English'
        onClick={() => {
          toggleLanguage(LANGUAGES.English);
        }}>
        🇬🇧
      </button>

      <span>CV Maker</span>

      <button
        type='button'
        className={isEnglish ? '' : 'active-lang'}
        title='Azərbaycanca'
        onClick={() => {
          toggleLanguage(LANGUAGES.Azerbaijani);
        }}>
        🇦🇿
      </button>
    </header>
  );
};
