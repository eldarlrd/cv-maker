import { type ReactElement } from 'react';

import { useStore } from '@/store.ts';

export const PPerson = (): ReactElement => {
  const { person } = useStore();

  const mailToUrl = 'mailto:' + person.email;

  const hasPersonInfo = Object.values(person).some(
    info => typeof info === 'string' && info.trim()
  );

  const visibleLinks = Object.entries(person.links).filter(
    ([_, link]: [string, string]) => link.trim()
  );

  const hasLinkInfo = Object.values(person.links).some((link: string) =>
    link.trim()
  );

  const contactInfo: ReactElement[] = [];

  if (person.email) {
    contactInfo.push(
      <a key='email' href={mailToUrl} title={mailToUrl} rel='noreferrer'>
        {person.email}
      </a>
    );
  }

  if (person.phone) contactInfo.push(<>{person.phone}</>);

  if (person.address) contactInfo.push(<>{person.address}</>);

  return (
    <div id='person'>
      {(hasPersonInfo || hasLinkInfo) && (
        <>
          <h1>{person.name}</h1>
          <h2>{person.title}</h2>

          <h3>
            {contactInfo.map((element, i) => (
              <span key={i}>
                {element}
                {i < contactInfo.length - 1 && ' | '}
              </span>
            ))}
          </h3>

          <h4>
            {visibleLinks.map(([site, link]: [string, string], i) => (
              <span key={site}>
                {link.trim() && (
                  <a href={link.trim()} title={link.trim()} rel='noreferrer'>
                    {site}
                  </a>
                )}
                {i < visibleLinks.length - 1 && ' | '}
              </span>
            ))}
          </h4>
          <hr />
        </>
      )}
    </div>
  );
};
