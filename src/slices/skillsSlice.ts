// biome-ignore-all assist/source/useSortedKeys: intended order
import type { StateCreator } from 'zustand';

import { registerSliceClear } from '$/sliceClear.ts';

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
  registerSliceClear(() => {
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
