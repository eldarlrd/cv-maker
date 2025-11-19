import { type StateCreator } from 'zustand';

import { useSliceReset } from '@/store.ts';

interface SkillsDetails {
  progLang: string;
  libFrame: string;
  toolPlat: string;
  databases: string;
  languages: string;
}

interface SkillsState {
  skills: SkillsDetails;
  setSkill: (updatedSkills: Partial<SkillsDetails>) => void;
}

const initialSkills: SkillsDetails = {
  progLang: '',
  libFrame: '',
  toolPlat: '',
  databases: '',
  languages: ''
};

const createSkillsSlice: StateCreator<SkillsState> = set => (
  useSliceReset.add(() => {
    set({ skills: initialSkills });
  }),
  {
    skills: { ...initialSkills },
    setSkill: (updatedSkills: Partial<SkillsDetails>): void => {
      set({
        skills: {
          ...initialSkills,
          ...updatedSkills
        }
      });
    }
  }
);

export { type SkillsState, createSkillsSlice };
