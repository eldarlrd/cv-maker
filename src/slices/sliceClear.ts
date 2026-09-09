const sliceClearHandlers = new Set<() => void>();

const registerSliceClear = (clearSlice: () => void): void => {
  sliceClearHandlers.add(clearSlice);
};

const clearStore = (): void => {
  sliceClearHandlers.forEach((clearSlice) => {
    clearSlice();
  });
};

export { clearStore, registerSliceClear };
