import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { ReactElement } from 'react';

export const Footer = (): ReactElement => (
  <footer>
    © 2024 - 2026{' '}
    <a
      href='https://github.com/eldarlrd/cv-maker'
      rel='author external noreferrer'
      target='_blank'
      title='Source'
      type='text/html'>
      <FontAwesomeIcon icon={faGithub} size='sm' /> eldarlrd
    </a>
  </footer>
);
