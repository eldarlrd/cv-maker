import { useContext } from 'react';

import { ConfirmationContext, type ConfirmationContextValue } from '!/ConfirmationContext.ts';
import { ERROR_CONFIRMATION_HOOK } from '#/errors.ts';

export const useConfirmation = (): ConfirmationContextValue => {
  const context = useContext(ConfirmationContext);

  if (!context) throw new Error(ERROR_CONFIRMATION_HOOK);

  return context;
};
