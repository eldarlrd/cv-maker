import { type ReactElement, type ReactNode, useCallback, useEffect, useRef, useState } from 'react';

import { CONFIRMATION_ENG } from '#/original.ts';
import { CONFIRMATION_AZE } from '#/translation.ts';
import { useStore } from '@/store.ts';
import { ConfirmationContext } from '%/confirmation.model.ts';
import { LANGUAGES } from '$/languageSlice.ts';

export const ConfirmationProvider = ({ children }: { children: ReactNode }): ReactElement => {
  const { language } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const resolverRef = useRef<((confirmed: boolean) => void) | null>(null);
  const confirmation = language === LANGUAGES.English ? CONFIRMATION_ENG : CONFIRMATION_AZE;

  const confirm = useCallback(
    (): Promise<boolean> =>
      new Promise((resolve) => {
        resolverRef.current = resolve;
        setIsOpen(true);
      }),
    []
  );

  const resolveConfirmation = (confirmed: boolean): void => {
    resolverRef.current?.(confirmed);
    resolverRef.current = null;
    setIsOpen(false);
  };

  useEffect(
    (): (() => void) => (): void => {
      resolverRef.current?.(false);
      resolverRef.current = null;
    },
    []
  );

  return (
    <ConfirmationContext.Provider value={{ confirm }}>
      {children}

      {isOpen ? (
        <div className='confirmation-overlay' role='presentation'>
          <div aria-modal='true' className='confirmation-modal' role='dialog'>
            <p>{confirmation.message}</p>

            <div className='confirmation-actions'>
              <button onClick={(): void => resolveConfirmation(false)} type='button'>
                {confirmation.no}
              </button>
              <button onClick={(): void => resolveConfirmation(true)} type='button'>
                {confirmation.yes}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </ConfirmationContext.Provider>
  );
};
