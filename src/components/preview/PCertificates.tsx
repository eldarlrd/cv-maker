import type { ReactElement } from 'react';

import { SECTIONS_AZE } from '#/translation.ts';
import { useStore } from '@/store.ts';
import { LANGUAGES } from '$/languageSlice.ts';

export const PCertificates = (): ReactElement => {
  const section = 'Certificates';
  const { certificates, language } = useStore();

  const hasCertificates = certificates.length > 0;
  const isEnglish = language === LANGUAGES.English;

  return (
    <div className='content simple'>
      {hasCertificates && (
        <>
          <h1>
            {isEnglish ? section.toUpperCase() : SECTIONS_AZE[section].toLocaleUpperCase('az')}
          </h1>

          <ul>
            {certificates.map((certificate) => (
              <li key={certificate.id}>
                {certificate.certTitle} -{' '}
                {certificate.link ? (
                  <a href={certificate.link} rel='noreferrer' title={certificate.link}>
                    {certificate.issuer}
                  </a>
                ) : (
                  certificate.issuer
                )}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};
