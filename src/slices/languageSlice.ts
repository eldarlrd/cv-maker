import { type StateCreator } from 'zustand';

enum LANGUAGES {
  English = 'ENG',
  Azerbaijani = 'AZE'
}

interface LanguageState {
  language: LANGUAGES;
  switchLanguage: (newLanguage: LANGUAGES) => void;
}

const createLanguageSlice: StateCreator<LanguageState> = set => ({
  language: LANGUAGES.English,
  switchLanguage: (newLanguage): void => {
    set({ language: newLanguage });
  }
});

export { type LanguageState, LANGUAGES, createLanguageSlice };
