import { type ReactElement } from 'react';

import { SECTIONS_AZE } from '@/config/translations.ts';
import { LANGUAGES } from '@/slices/languageSlice.ts';
import { useStore } from '@/store.ts';

export const PCertifications = (): ReactElement => {
  const section = 'Certifications';
  const { certifications, language } = useStore();

  const hasCertifications = certifications.length > 0;
  const isEnglish = language === LANGUAGES.English;

  return (
    <div className='content simple'>
      {hasCertifications && (
        <>
          <h1>
            {isEnglish ?
              section.toUpperCase()
            : SECTIONS_AZE[section].toLocaleUpperCase('az')}
          </h1>

          <ul>
            {certifications.map(certification => (
              <li key={certification.id}>
                {certification.certTitle} -{' '}
                {certification.link ?
                  <a
                    title={certification.link}
                    href={certification.link}
                    rel='noreferrer'>
                    {certification.issuer}
                  </a>
                : certification.issuer}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};
