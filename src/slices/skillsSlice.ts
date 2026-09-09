// biome-ignore-all assist/source/useSortedKeys: intended order
import type { StateCreator } from 'zustand';

import { registerSliceReset } from '$/sliceReset.ts';

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
  progLang: '',
  libFrame: '',
  toolPlat: '',
  databases: '',
  languages: '',
};

const createSkillsSlice: StateCreator<SkillsState> = (set) => {
  registerSliceReset(() => {
    set({ skills: initialSkills });
  });

  return {
    setSkill: (updatedSkills: Partial<SkillsDetails>): void => {
      set({
        skills: {
          ...initialSkills,
          ...updatedSkills,
        },
      });
    },
    skills: { ...initialSkills },
  };
};

export { type SkillsState, createSkillsSlice };
