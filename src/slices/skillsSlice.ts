import type { StateCreator } from 'zustand';

import { useSliceReset } from '@/store.ts';

interface SkillsDetails {
  databases: string;
  languages: string;
  libFrame: string;
  progLang: string;
  toolPlat: string;
}

interface SkillsState {
  setSkill: (updatedSkills: Partial<SkillsDetails>) => void;
  skills: SkillsDetails;
}

const initialSkills: SkillsDetails = {
  databases: '',
  languages: '',
  libFrame: '',
  progLang: '',
  toolPlat: '',
};

const createSkillsSlice: StateCreator<SkillsState> = (set) => (
  useSliceReset.add(() => {
    set({ skills: initialSkills });
  }),
  {
    setSkill: (updatedSkills: Partial<SkillsDetails>): void => {
      set({
        skills: {
          ...initialSkills,
          ...updatedSkills,
        },
      });
    },
    skills: { ...initialSkills },
  }
);

export { type SkillsState, createSkillsSlice };
