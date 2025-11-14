import { type StateCreator } from 'zustand';

interface OpenMenusState {
  openMenus: string[];
  toggleMenu: (menuName: string) => void;
}

const initialMenus: string[] = ['Personal'];

const createOpenMenusSlice: StateCreator<OpenMenusState> = set => ({
  openMenus: initialMenus,
  toggleMenu: (menuName): void => {
    set(state => ({
      openMenus:
        state.openMenus.includes(menuName) ?
          state.openMenus.filter(currName => currName !== menuName)
        : [...state.openMenus, menuName]
    }));
  }
});

export { type OpenMenusState, createOpenMenusSlice };
