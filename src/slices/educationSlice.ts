import type { StateCreator } from 'zustand';

import { registerSliceReset } from '$/sliceReset.ts';

interface EducationDetails {
  college: string;
  degree: string;
  endYear: string;
  id: string;
  major: string;
  startYear: string;
}

interface EducationState {
  addEducation: (newEducation: EducationDetails) => void;
  education: EducationDetails[];
  removeEducation: (id: string) => void;
  sortEducation: (sortedEducation: EducationDetails[]) => void;
}

const initialEducation: EducationDetails[] = [];

const createEducationSlice: StateCreator<EducationState> = (set) => {
  registerSliceReset(() => {
    set({ education: initialEducation });
  });

  return {
    addEducation: (newEducation: EducationDetails): void => {
      set((state) => ({
        education: [...state.education, newEducation],
      }));
    },
    education: initialEducation,

    removeEducation: (id: string): void => {
      set((state: EducationState) => ({
        education: state.education.filter((education) => education.id !== id),
      }));
    },
    sortEducation: (sortedEducation: EducationDetails[]): void => {
      set({ education: sortedEducation });
    },
  };
};

export { type EducationDetails, type EducationState, createEducationSlice };
