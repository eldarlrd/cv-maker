import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { type CertificationsState, createCertificationsSlice } from '$/certificationsSlice.ts';
import { type EducationState, createEducationSlice } from '$/educationSlice.ts';
import { type ExperienceState, createExperienceSlice } from '$/experienceSlice.ts';
import { type LanguageState, createLanguageSlice } from '$/languageSlice.ts';
import { type OpenMenusState, createOpenMenusSlice } from '$/openMenusSlice.ts';
import { type PersonState, createPersonSlice } from '$/personSlice.ts';
import { type ProjectsState, createProjectsSlice } from '$/projectsSlice.ts';
import { type SkillsState, createSkillsSlice } from '$/skillsSlice.ts';
import { clearStore } from '$/sliceClear.ts';

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
      ...createLanguageSlice(...a),
    }),
    { name: 'store' }
  )
);

export { clearStore, useStore };
