import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { type ReactElement } from 'react';

export const Footer = (): ReactElement => (
  <footer>
    © 2024 - 2025{' '}
    <a
      title='Source'
      target='_blank'
      type='text/html'
      rel='author external noreferrer'
      href='https://github.com/eldarlrd/cv-maker'>
      <FontAwesomeIcon size='sm' icon={faGithub} /> eldarlrd
    </a>
  </footer>
);
