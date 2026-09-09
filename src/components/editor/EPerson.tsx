import { faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { ChangeEvent, ReactElement } from 'react';

import { PERSONAL_ENG } from '#/fields.ts';
import { PERSONAL_AZE } from '#/translations.ts';
import { DrawerButton } from '@/components/editor/menus/DrawerButton.tsx';
import { useStore } from '@/store.ts';
import { LANGUAGES } from '$/languageSlice.ts';

export const EPerson = (): ReactElement => {
  const section = 'Personal';
  const { person, setPerson, openMenus, language } = useStore();
  const isVisible = openMenus.includes(section);

  const handlePersonInput = (e: ChangeEvent<HTMLInputElement>): void => {
    setPerson({
      ...person,
      [e.target.id]: e.target.value,
    });
  };

  const handleLinkInput = (e: ChangeEvent<HTMLInputElement>): void => {
    setPerson({
      ...person,
      links: {
        ...person.links,
        [e.target.id]: e.target.value,
      },
    });
  };

  const isEnglish = language === LANGUAGES.English;

  return (
    <>
      <DrawerButton isVisible={isVisible} section={section} />

      <div className={`${isVisible ? '' : 'closed'} editor-section`}>
        <div className='two-column'>
          <span>
            <label htmlFor='name'>
              {isEnglish ? PERSONAL_ENG.fullName : PERSONAL_AZE.fullName}
            </label>
            <input
              autoCapitalize='words'
              autoComplete='on'
              id='name'
              maxLength={128}
              minLength={1}
              onInput={handlePersonInput}
              title=''
              type='text'
              value={person.name}
            />
          </span>

          <span>
            <label htmlFor='title'>
              {isEnglish ? PERSONAL_ENG.profession : PERSONAL_AZE.profession}
            </label>
            <input
              autoCapitalize='words'
              id='title'
              maxLength={128}
              minLength={1}
              onInput={handlePersonInput}
              title=''
              type='text'
              value={person.title}
            />
          </span>
        </div>

        <div className='three-column'>
          <span>
            <label htmlFor='email'>Email</label>
            <input
              autoComplete='on'
              id='email'
              maxLength={128}
              minLength={1}
              onInput={handlePersonInput}
              title=''
              type='email'
              value={person.email}
            />
          </span>

          <span>
            <label htmlFor='phone'>{isEnglish ? PERSONAL_ENG.phone : PERSONAL_AZE.phone}</label>
            <input
              autoComplete='on'
              id='phone'
              maxLength={18}
              minLength={9}
              onInput={handlePersonInput}
              pattern='^(\+?\d{1,3}\s?)?(\(\d{2,3}\)|\d{2,3})[\s\-]?\d{3}[\s\-]?\d{2}[\s\-]?\d{2}$'
              title=''
              type='tel'
              value={person.phone}
            />
          </span>

          <span>
            <label htmlFor='address'>
              {isEnglish ? PERSONAL_ENG.address : PERSONAL_AZE.address}
            </label>
            <input
              autoComplete='on'
              id='address'
              maxLength={128}
              minLength={1}
              onInput={handlePersonInput}
              title=''
              type='address'
              value={person.address}
            />
          </span>
        </div>

        <div className='three-column'>
          <span>
            <label htmlFor='Portfolio'>
              Portfolio <FontAwesomeIcon icon={faLink} size='sm' />
            </label>
            <input
              id='Portfolio'
              maxLength={256}
              minLength={1}
              onInput={handleLinkInput}
              title=''
              type='text'
              value={person.links.Portfolio}
            />
          </span>

          <span>
            <label htmlFor='GitHub'>
              GitHub <FontAwesomeIcon icon={faLink} size='sm' />
            </label>
            <input
              id='GitHub'
              maxLength={256}
              minLength={1}
              onInput={handleLinkInput}
              title=''
              type='text'
              value={person.links.GitHub}
            />
          </span>

          <span>
            <label htmlFor='LinkedIn'>
              LinkedIn <FontAwesomeIcon icon={faLink} size='sm' />
            </label>
            <input
              id='LinkedIn'
              maxLength={256}
              minLength={1}
              onInput={handleLinkInput}
              title=''
              type='text'
              value={person.links.LinkedIn}
            />
          </span>
        </div>
      </div>
    </>
  );
};
