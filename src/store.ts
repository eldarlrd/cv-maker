import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import {
  type CertificationsState,
  createCertificationsSlice
} from '@/slices/certificationsSlice.ts';
import {
  type EducationState,
  createEducationSlice
} from '@/slices/educationSlice.ts';
import {
  type ExperienceState,
  createExperienceSlice
} from '@/slices/experienceSlice.ts';
import {
  createLanguageSlice,
  type LanguageState
} from '@/slices/languageSlice.ts';
import {
  type OpenMenusState,
  createOpenMenusSlice
} from '@/slices/openMenusSlice.ts';
import { type PersonState, createPersonSlice } from '@/slices/personSlice.ts';
import {
  type ProjectsState,
  createProjectsSlice
} from '@/slices/projectsSlice.ts';
import { type SkillsState, createSkillsSlice } from '@/slices/skillsSlice.ts';

const useSliceReset = new Set<() => void>();

const useResetStore = (): void => {
  useSliceReset.forEach(resetSlice => {
    resetSlice();
  });
};

interface StoreState
  extends PersonState,
    ExperienceState,
    EducationState,
    SkillsState,
    ProjectsState,
    CertificationsState,
    OpenMenusState,
    LanguageState {}

const useStore = create<StoreState>()(
  persist(
    (...a) => ({
      ...createPersonSlice(...a),
      ...createExperienceSlice(...a),
      ...createEducationSlice(...a),
      ...createSkillsSlice(...a),
      ...createProjectsSlice(...a),
      ...createCertificationsSlice(...a),
      ...createOpenMenusSlice(...a),
      ...createLanguageSlice(...a)
    }),
    { name: 'store' }
  )
);

export { useResetStore, useSliceReset, useStore };
