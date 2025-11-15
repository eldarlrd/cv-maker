import { faCircleDown, faRotate } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { type ReactElement, type RefObject } from 'react';
import { useReactToPrint } from 'react-to-print';

import { ACTIONS_ENG } from '@/config/fields.ts';
import { ACTIONS_AZE } from '@/config/translations.ts';
import { LANGUAGES } from '@/slices/languageSlice.ts';
import { useResetStore, useStore } from '@/store.ts';

export const Actions = ({
  printRef
}: {
  printRef: RefObject<HTMLElement | null>;
}): ReactElement => {
  const { person, language } = useStore();

  const kebabize = (str: string): string => str.trim().replaceAll(' ', '_');
  const reactToPrintFn = useReactToPrint({
    contentRef: printRef,
    // * Mobile Fix | Courtesy of https://github.com/sensasi-delight
    preserveAfterPrint: true,
    print: printIframe => {
      return new Promise(() => {
        printIframe.style.display = 'none';
        printIframe.contentWindow?.print();
      });
    },
    documentTitle: kebabize(`${person.name} ${person.title} CV`),
    pageStyle: `
      main {
        margin: 0 !important;
        width: 100% !important;
        box-shadow: none !important;
        max-height: none !important;
        max-width: 100svw !important;
        min-height: 100svh !important;
      }`
  });

  const isEnglish = language === LANGUAGES.English;

  return (
    <div id='actions'>
      <button
        type='button'
        id='reset-btn'
        className='action-btn'
        onClick={useResetStore}>
        <FontAwesomeIcon icon={faRotate} />{' '}
        {isEnglish ? ACTIONS_ENG.reset : ACTIONS_AZE.reset}
      </button>

      <button
        type='button'
        id='download-btn'
        className='action-btn'
        onClick={reactToPrintFn}>
        <FontAwesomeIcon icon={faCircleDown} />{' '}
        {isEnglish ? ACTIONS_ENG.download : ACTIONS_AZE.download}
      </button>
    </div>
  );
};
