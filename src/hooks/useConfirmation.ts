import { useContext } from 'react';

import { ERROR_CONFIRMATION_HOOK } from '#/errors.ts';
import { ConfirmationContext, type ConfirmationContextValue } from '%/confirmation.model.ts';

export const useConfirmation = (): ConfirmationContextValue => {
  const context = useContext(ConfirmationContext);

  if (!context) throw new Error(ERROR_CONFIRMATION_HOOK);

  return context;
};
