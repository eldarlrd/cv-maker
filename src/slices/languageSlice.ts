import type { StateCreator } from 'zustand';

enum LANGUAGES {
  Azerbaijani = 'AZE',
  English = 'ENG',
}

interface LanguageState {
  language: LANGUAGES;
  switchLanguage: (newLanguage: LANGUAGES) => void;
}

const createLanguageSlice: StateCreator<LanguageState> = (set) => ({
  language: LANGUAGES.English,
  switchLanguage: (newLanguage): void => {
    set({ language: newLanguage });
  },
});

export { LANGUAGES, type LanguageState, createLanguageSlice };
