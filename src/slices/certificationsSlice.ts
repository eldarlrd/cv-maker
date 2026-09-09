import type { StateCreator } from 'zustand';

import { useSliceReset } from '@/store.ts';

interface CertificationDetails {
  certTitle: string;
  id: string;
  issuer: string;
  link: string;
}

interface CertificationsState {
  addCertification: (newCertification: CertificationDetails) => void;
  certifications: CertificationDetails[];
  removeCertification: (id: string) => void;
  sortCertifications: (sortedCertifications: CertificationDetails[]) => void;
}

const initialCertifications: CertificationDetails[] = [];

const createCertificationsSlice: StateCreator<CertificationsState> = (set) => (
  useSliceReset.add(() => {
    set({ certifications: initialCertifications });
  }),
  {
    addCertification: (newCertification: CertificationDetails): void => {
      set((state) => ({
        certifications: [...state.certifications, newCertification],
      }));
    },
    certifications: initialCertifications,

    removeCertification: (id: string): void => {
      set((state: CertificationsState) => ({
        certifications: state.certifications.filter((certification) => certification.id !== id),
      }));
    },
    sortCertifications: (sortedCertifications: CertificationDetails[]): void => {
      set({ certifications: sortedCertifications });
    },
  }
);

export { type CertificationDetails, type CertificationsState, createCertificationsSlice };
