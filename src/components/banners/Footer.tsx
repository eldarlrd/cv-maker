import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { ReactElement } from 'react';

import { SOURCE_ENG } from '#/original.ts';
import { SOURCE_AZE } from '#/translation.ts';
import { useStore } from '@/store.ts';
import { LANGUAGES } from '$/languageSlice.ts';

export const Footer = (): ReactElement => {
  const { language } = useStore();

  const isEnglish = language === LANGUAGES.English;

  return (
    <footer>
      © 2024 - 2026{' '}
      <a
        href='https://github.com/eldarlrd/cv-maker'
        rel='author external noreferrer'
        target='_blank'
        title={isEnglish ? SOURCE_ENG.source : SOURCE_AZE.source}
        type='text/html'>
        <FontAwesomeIcon icon={faGithub} size='sm' /> eldarlrd
      </a>
    </footer>
  );
};
