import type { ReactElement } from 'react';

import { useStore } from '@/store.ts';

export const PPerson = (): ReactElement => {
  const { person } = useStore();

  const mailToUrl = `mailto:${person.email}`;

  const hasPersonInfo = Object.values(person).some(
    (info) => typeof info === 'string' && info.trim()
  );

  const visibleLinks = Object.entries(person.links).filter(([_, link]: [string, string]) =>
    link.trim()
  );

  const hasLinkInfo = Object.values(person.links).some((link: string) => link.trim());

  const contactInfo: { content: ReactElement | string; id: string }[] = [];

  if (person.email) {
    contactInfo.push({
      content: (
        <a href={mailToUrl} key='email' rel='noreferrer' title={mailToUrl}>
          {person.email}
        </a>
      ),
      id: 'email',
    });
  }

  if (person.phone) contactInfo.push({ content: person.phone, id: 'phone' });
  if (person.address) contactInfo.push({ content: person.address, id: 'address' });

  return (
    <div id='person'>
      {hasPersonInfo || hasLinkInfo ? (
        <>
          <h1>{person.name}</h1>
          <h2>{person.title}</h2>

          <h3>
            {contactInfo.map(({ content, id }, i) => (
              <span key={id}>
                {content}
                {i < contactInfo.length - 1 && ' | '}
              </span>
            ))}
          </h3>

          <h4>
            {visibleLinks.map(([site, link]: [string, string], i) => (
              <span key={site}>
                {link.trim() && (
                  <a href={link.trim()} rel='noreferrer' title={link.trim()}>
                    {site}
                  </a>
                )}
                {i < visibleLinks.length - 1 && ' | '}
              </span>
            ))}
          </h4>
          <hr />
        </>
      ) : null}
    </div>
  );
};
