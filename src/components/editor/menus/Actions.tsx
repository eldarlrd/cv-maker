import {
  faCircleDown,
  faClipboard,
  faClipboardCheck,
  faClipboardQuestion,
  faFileCircleCheck,
  faPaste,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { type ReactElement, type RefObject, useState } from 'react';
import { useReactToPrint } from 'react-to-print';

import { kebabize, normalize } from '&/text.ts';
import { useConfirmation } from '!/useConfirmation.ts';
import { ACTIONS_ENG } from '#/original.ts';
import { ACTIONS_AZE } from '#/translation.ts';
import { clearStore, useStore } from '@/store.ts';
import { LANGUAGES } from '$/languageSlice.ts';

const CLIPBOARD_FEEDBACK_DURATION = 1000;

export const Actions = ({
  printRef,
}: {
  printRef: RefObject<HTMLElement | null>;
}): ReactElement => {
  const { person, language } = useStore();
  const { confirm } = useConfirmation();
  const [isCopied, setIsCopied] = useState(false);
  const [isPasted, setIsPasted] = useState(false);
  const [isPasteError, setIsPasteError] = useState(false);

  const normalizedName = normalize(person.name, language);
  const normalizedTitle = normalize(person.title, language);
  const documentTitle = kebabize(`${normalizedName}_${normalizedTitle}_CV`);

  const reactToPrintFn = useReactToPrint({
    contentRef: printRef,
    pageStyle: `
      main {
        margin: 0 !important;
        width: 100% !important;
        box-shadow: none !important;
        max-height: none !important;
        max-width: 100svw !important;
        min-height: 100svh !important;
      }`,
    // # Mobile Fix | Courtesy of https://github.com/sensasi-delight
    preserveAfterPrint: true,
    print: (printIframe) =>
      new Promise(() => {
        const ownerDocument = printIframe.ownerDocument;
        ownerDocument.title = documentTitle;

        printIframe.style.display = 'none';
        printIframe.contentWindow?.print();
      }),
  });

  const isEnglish = language === LANGUAGES.English;

  const copyStore = async (): Promise<void> => {
    await navigator.clipboard.writeText(localStorage.getItem('store') ?? '');
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), CLIPBOARD_FEEDBACK_DURATION);
  };

  const pasteStore = async (): Promise<void> => {
    try {
      const { state } = JSON.parse(await navigator.clipboard.readText()) as {
        state?: Partial<ReturnType<typeof useStore.getState>>;
      };

      if (!state || typeof state !== 'object') throw new Error('Invalid clipboard data.');

      useStore.setState(state);
      setIsPasted(true);
      setTimeout(() => setIsPasted(false), CLIPBOARD_FEEDBACK_DURATION);
    } catch {
      setIsPasteError(true);
      setTimeout(() => setIsPasteError(false), CLIPBOARD_FEEDBACK_DURATION);
    }
  };

  const clearStoreWithConfirmation = async (): Promise<void> => {
    if (await confirm()) clearStore();
  };

  return (
    <div id='actions'>
      <button
        className='action-btn'
        id='clear-btn'
        onClick={clearStoreWithConfirmation}
        title={isEnglish ? ACTIONS_ENG.clear : ACTIONS_AZE.clear}
        type='button'>
        <FontAwesomeIcon icon={faTrash} /> {/* isEnglish ? ACTIONS_ENG.clear : ACTIONS_AZE.clear */}
      </button>

      <button
        className='action-btn'
        id='paste-btn'
        onClick={pasteStore}
        title={isEnglish ? ACTIONS_ENG.paste : ACTIONS_AZE.paste}
        type='button'>
        <FontAwesomeIcon
          icon={isPasteError ? faClipboardQuestion : isPasted ? faFileCircleCheck : faPaste}
        />
      </button>

      <button
        className='action-btn'
        disabled={!(normalizedName && normalizedTitle)}
        id='copy-btn'
        onClick={copyStore}
        title={isEnglish ? ACTIONS_ENG.clipboard : ACTIONS_AZE.clipboard}
        type='button'>
        <FontAwesomeIcon icon={isCopied ? faClipboardCheck : faClipboard} />
      </button>

      <button
        className='action-btn'
        disabled={!(normalizedName && normalizedTitle)}
        id='download-btn'
        onClick={reactToPrintFn}
        type='button'>
        <FontAwesomeIcon icon={faCircleDown} />{' '}
        {isEnglish ? ACTIONS_ENG.download : ACTIONS_AZE.download}
      </button>
    </div>
  );
};
