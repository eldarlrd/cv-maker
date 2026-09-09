import type { StateCreator } from 'zustand';

import { registerSliceReset } from '$/sliceReset.ts';

interface PersonLinks {
  GitHub: string;
  LinkedIn: string;
  Portfolio: string;
}

interface PersonDetails {
  address: string;
  email: string;
  links: PersonLinks;
  name: string;
  phone: string;
  title: string;
}

interface PersonState {
  person: PersonDetails;
  setPerson: (updatedPerson: Partial<PersonDetails>) => void;
}

const initialPerson: PersonDetails = {
  address: '',
  email: '',
  links: {
    GitHub: '',
    LinkedIn: '',
    Portfolio: '',
  },
  name: '',
  phone: '',
  title: '',
};

const createPersonSlice: StateCreator<PersonState> = (set) => {
  registerSliceReset(() => {
    set({ person: initialPerson });
  });

  return {
    person: { ...initialPerson },
    setPerson: (updatedPerson: Partial<PersonDetails>): void => {
      set({
        person: {
          ...initialPerson,
          ...updatedPerson,
          links: { ...initialPerson.links, ...updatedPerson.links },
        },
      });
    },
  };
};

export { type PersonState, createPersonSlice };
