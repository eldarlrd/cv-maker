import { faCircleDown, faRotate } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { ReactElement, RefObject } from 'react';
import { useReactToPrint } from 'react-to-print';

import { ACTIONS_ENG } from '#/fields.ts';
import { ACTIONS_AZE } from '#/translations.ts';
import { resetStore, useStore } from '@/store.ts';
import { LANGUAGES } from '$/languageSlice.ts';

export const Actions = ({
  printRef,
}: {
  printRef: RefObject<HTMLElement | null>;
}): ReactElement => {
  const { person, language } = useStore();

  const kebabize = (str: string): string => str.trim().replaceAll(' ', '_');
  const reactToPrintFn = useReactToPrint({
    contentRef: printRef,
    documentTitle: kebabize(`${person.name} ${person.title} CV`),
    pageStyle: `
      main {
        margin: 0 !important;
        width: 100% !important;
        box-shadow: none !important;
        max-height: none !important;
        max-width: 100svw !important;
        min-height: 100svh !important;
      }`,
    // * Mobile Fix | Courtesy of https://github.com/sensasi-delight
    preserveAfterPrint: true,
    print: (printIframe) =>
      new Promise(() => {
        printIframe.style.display = 'none';
        printIframe.contentWindow?.print();
      }),
  });

  const isEnglish = language === LANGUAGES.English;

  return (
    <div id='actions'>
      <button className='action-btn' id='reset-btn' onClick={resetStore} type='button'>
        <FontAwesomeIcon icon={faRotate} /> {isEnglish ? ACTIONS_ENG.reset : ACTIONS_AZE.reset}
      </button>

      <button className='action-btn' id='download-btn' onClick={reactToPrintFn} type='button'>
        <FontAwesomeIcon icon={faCircleDown} />{' '}
        {isEnglish ? ACTIONS_ENG.download : ACTIONS_AZE.download}
      </button>
    </div>
  );
};
