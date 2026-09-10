import { createContext } from 'react';

export interface ConfirmationContextValue {
  confirm: () => Promise<boolean>;
}

export const ConfirmationContext = createContext<ConfirmationContextValue | null>(null);
