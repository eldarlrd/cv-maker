import type { ReactElement } from 'react';

import { useStore } from '@/store.ts';
import { LANGUAGES } from '$/languageSlice.ts';

export const Header = (): ReactElement => {
  const { language, switchLanguage } = useStore();

  const toggleLanguage = (newLanguage: LANGUAGES): void => {
    switchLanguage(newLanguage);
  };

  const isEnglish = language === LANGUAGES.English;

  return (
    <header>
      <button
        className={isEnglish ? 'active-lang' : ''}
        onClick={(): void => {
          toggleLanguage(LANGUAGES.English);
        }}
        title='English'
        type='button'>
        🇬🇧
      </button>

      <span>CV Maker</span>

      <button
        className={isEnglish ? '' : 'active-lang'}
        onClick={(): void => {
          toggleLanguage(LANGUAGES.Azerbaijani);
        }}
        title='Azərbaycanca'
        type='button'>
        🇦🇿
      </button>
    </header>
  );
};
