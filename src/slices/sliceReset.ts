const sliceResetHandlers = new Set<() => void>();

const registerSliceReset = (resetSlice: () => void): void => {
  sliceResetHandlers.add(resetSlice);
};

const resetStore = (): void => {
  sliceResetHandlers.forEach((resetSlice) => {
    resetSlice();
  });
};

export { registerSliceReset, resetStore };
