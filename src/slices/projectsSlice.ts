import type { StateCreator } from 'zustand';

import { registerSliceReset } from '$/sliceReset.ts';

interface ProjectDetails {
  id: string;
  projDescriptions: string[];
  projLink: string;
  projName: string;
  stack: string;
}

interface ProjectsState {
  addProject: (newProject: ProjectDetails) => void;
  projects: ProjectDetails[];
  removeProject: (id: string) => void;
  sortProjects: (sortedProjects: ProjectDetails[]) => void;
}

const initialProjects: ProjectDetails[] = [];

const createProjectsSlice: StateCreator<ProjectsState> = (set) => {
  registerSliceReset(() => {
    set({ projects: initialProjects });
  });

  return {
    addProject: (newProject: ProjectDetails): void => {
      set((state) => ({
        projects: [...state.projects, newProject],
      }));
    },
    projects: initialProjects,

    removeProject: (id: string): void => {
      set((state: ProjectsState) => ({
        projects: state.projects.filter((project) => project.id !== id),
      }));
    },
    sortProjects: (sortedProjects: ProjectDetails[]): void => {
      set({ projects: sortedProjects });
    },
  };
};

export { type ProjectDetails, type ProjectsState, createProjectsSlice };
