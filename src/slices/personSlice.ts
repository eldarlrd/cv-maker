import { type StateCreator } from 'zustand';

import { useSliceReset } from '@/store.ts';

interface PersonLinks {
  Portfolio: string;
  GitHub: string;
  LinkedIn: string;
}

interface PersonDetails {
  name: string;
  title: string;
  email: string;
  phone: string;
  persLocation: string;
  links: PersonLinks;
}

interface PersonState {
  person: PersonDetails;
  setPerson: (updatedPerson: Partial<PersonDetails>) => void;
}

const initialPerson: PersonDetails = {
  name: '',
  title: '',
  email: '',
  phone: '',
  persLocation: '',
  links: {
    Portfolio: '',
    GitHub: '',
    LinkedIn: ''
  }
};

const createPersonSlice: StateCreator<PersonState> = set => (
  useSliceReset.add(() => {
    set({ person: initialPerson });
  }),
  {
    person: { ...initialPerson },
    setPerson: (updatedPerson: Partial<PersonDetails>): void => {
      set({
        person: {
          ...initialPerson,
          ...updatedPerson,
          links: { ...initialPerson.links, ...updatedPerson.links }
        }
      });
    }
  }
);

export { type PersonState, createPersonSlice };
