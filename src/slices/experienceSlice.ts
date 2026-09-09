import type { StateCreator } from 'zustand';

import { registerSliceReset } from '$/sliceReset.ts';

interface ExperienceDetails {
  descriptions: string[];
  employer: string;
  endDate: string;
  id: string;
  location: string;
  position: string;
  startDate: string;
}

interface ExperienceState {
  addExperience: (newExperience: ExperienceDetails) => void;
  experience: ExperienceDetails[];
  removeExperience: (id: string) => void;
  sortExperience: (sortedExperience: ExperienceDetails[]) => void;
}

const initialExperience: ExperienceDetails[] = [];

const createExperienceSlice: StateCreator<ExperienceState> = (set) => {
  registerSliceReset(() => {
    set({ experience: initialExperience });
  });

  return {
    addExperience: (newExperience: ExperienceDetails): void => {
      set((state) => ({
        experience: [...state.experience, newExperience],
      }));
    },
    experience: initialExperience,

    removeExperience: (id: string): void => {
      set((state: ExperienceState) => ({
        experience: state.experience.filter((experience) => experience.id !== id),
      }));
    },
    sortExperience: (sortedExperience: ExperienceDetails[]): void => {
      set({ experience: sortedExperience });
    },
  };
};

export { type ExperienceDetails, type ExperienceState, createExperienceSlice };
