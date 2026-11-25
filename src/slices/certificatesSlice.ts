import type { StateCreator } from 'zustand';

import { registerSliceClear } from '$/sliceClear.ts';

interface CertificateDetails {
  certTitle: string;
  id: string;
  issuer: string;
  link: string;
}

interface CertificatesState {
  addCertificate: (newCertificate: CertificateDetails) => void;
  certificates: CertificateDetails[];
  removeCertificate: (id: string) => void;
  sortCertificates: (sortedCertificates: CertificateDetails[]) => void;
}

const initialCertificates: CertificateDetails[] = [];

const createCertificatesSlice: StateCreator<CertificatesState> = (set) => {
  registerSliceClear(() => {
    set({ certificates: initialCertificates });
  });

  return {
    addCertificate: (newCertificate: CertificateDetails): void => {
      set((state) => ({
        certificates: [newCertificate, ...state.certificates],
      }));
    },
    certificates: initialCertificates,

    removeCertificate: (id: string): void => {
      set((state: CertificatesState) => ({
        certificates: state.certificates.filter((certificate) => certificate.id !== id),
      }));
    },
    sortCertificates: (sortedCertificates: CertificateDetails[]): void => {
      set({ certificates: sortedCertificates });
    },
  };
};

export { type CertificateDetails, type CertificatesState, createCertificatesSlice };
