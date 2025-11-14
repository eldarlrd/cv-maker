import { faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { type ChangeEvent, type ReactElement } from 'react';

import { DrawerButton } from '@/components/editor/menus/DrawerButton.tsx';
import { useStore } from '@/store.ts';

export const EPerson = (): ReactElement => {
  const section = 'Personal Info';
  const { person, setPerson, openMenus } = useStore();
  const isVisible = openMenus.includes(section);

  const handlePersonInput = (e: ChangeEvent<HTMLInputElement>): void => {
    setPerson({
      ...person,
      [e.target.id]: e.target.value
    });
  };

  const handleLinkInput = (e: ChangeEvent<HTMLInputElement>): void => {
    setPerson({
      ...person,
      links: {
        ...person.links,
        [e.target.id]: e.target.value
      }
    });
  };

  return (
    <>
      <DrawerButton section={section} isVisible={isVisible} />

      <div className={`${isVisible ? '' : 'closed'} editor-section`}>
        <div className='two-column'>
          <span>
            <label htmlFor='name'>Full Name</label>
            <input
              title=''
              id='name'
              type='text'
              minLength={1}
              maxLength={128}
              value={person.name}
              onInput={handlePersonInput}
              autoCapitalize='words'
              autoComplete='on'
            />
          </span>

          <span>
            <label htmlFor='title'>Profession</label>
            <input
              title=''
              id='title'
              type='text'
              minLength={1}
              maxLength={128}
              value={person.title}
              onInput={handlePersonInput}
              autoCapitalize='words'
            />
          </span>
        </div>

        <div className='three-column'>
          <span>
            <label htmlFor='email'>Email</label>
            <input
              title=''
              id='email'
              type='email'
              minLength={1}
              maxLength={128}
              value={person.email}
              onInput={handlePersonInput}
              autoComplete='on'
            />
          </span>

          <span>
            <label htmlFor='phone'>Phone</label>
            <input
              title=''
              id='phone'
              type='tel'
              minLength={9}
              maxLength={18}
              value={person.phone}
              onInput={handlePersonInput}
              pattern='^(\+?\d{1,3}\s?)?(\(\d{2,3}\)|\d{2,3})[\s\-]?\d{3}[\s\-]?\d{2}[\s\-]?\d{2}$'
              autoComplete='on'
            />
          </span>

          <span>
            <label htmlFor='persLocation'>Location</label>
            <input
              title=''
              id='persLocation'
              type='persLocation'
              minLength={1}
              maxLength={128}
              value={person.persLocation}
              onInput={handlePersonInput}
              autoComplete='on'
            />
          </span>
        </div>

        <div className='three-column'>
          <span>
            <label htmlFor='Portfolio'>
              Portfolio <FontAwesomeIcon size='sm' icon={faLink} />
            </label>
            <input
              title=''
              id='Portfolio'
              type='text'
              minLength={1}
              maxLength={256}
              value={person.links.Portfolio}
              onInput={handleLinkInput}
            />
          </span>

          <span>
            <label htmlFor='GitHub'>
              GitHub <FontAwesomeIcon size='sm' icon={faLink} />
            </label>
            <input
              title=''
              id='GitHub'
              type='text'
              minLength={1}
              maxLength={256}
              value={person.links.GitHub}
              onInput={handleLinkInput}
            />
          </span>

          <span>
            <label htmlFor='LinkedIn'>
              LinkedIn <FontAwesomeIcon size='sm' icon={faLink} />
            </label>
            <input
              title=''
              id='LinkedIn'
              type='text'
              minLength={1}
              maxLength={256}
              value={person.links.LinkedIn}
              onInput={handleLinkInput}
            />
          </span>
        </div>
      </div>
    </>
  );
};
