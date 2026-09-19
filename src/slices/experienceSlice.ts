import type { StateCreator } from 'zustand';

import { registerSliceClear } from '$/sliceClear.ts';

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
  registerSliceClear(() => {
    set({ experience: initialExperience });
  });

  return {
    addExperience: (newExperience: ExperienceDetails): void => {
      set((state) => ({
        experience: [
          {
            ...newExperience,
            location: newExperience.location.trim(),
          },
          ...state.experience,
        ],
      }));
    },
    experience: initialExperience,

    removeExperience: (id: string): void => {
      set((state: ExperienceState) => ({
        experience: state.experience.filter((experience) => experience.id !== id),
      }));
    },
    sortExperience: (sortedExperience: ExperienceDetails[]): void => {
      set({
        experience: sortedExperience.map((experience) => ({
          ...experience,
          location: experience.location.trim(),
        })),
      });
    },
  };
};

export { type ExperienceDetails, type ExperienceState, createExperienceSlice };
