import { faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { nanoid } from 'nanoid';
import { useState, type ReactElement, type ChangeEvent } from 'react';

import { DndList, type ListProps } from '@/components/editor/menus/DndList.tsx';
import { DrawerButton } from '@/components/editor/menus/DrawerButton.tsx';
import { type CertificationDetails } from '@/slices/certificationsSlice.ts';
import { useStore } from '@/store.ts';

export const ECertifications = (): ReactElement => {
  const section = 'Certifications';
  const {
    certifications,
    sortCertifications,
    addCertification,
    removeCertification,
    openMenus
  } = useStore();
  const isVisible = openMenus.includes(section);

  const [certificationObj, setCertificationObj] =
    useState<CertificationDetails>({
      id: '',
      certTitle: '',
      issuer: '',
      link: ''
    });

  const isDisabled = !certificationObj.certTitle || !certificationObj.issuer;

  const handleCertificationInput = (e: ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = e.target;

    setCertificationObj(prevObj => ({
      ...prevObj,
      [id]: value
    }));
  };

  const handleAddCertification = (): void => {
    addCertification({
      ...certificationObj,
      id: nanoid()
    });
    setCertificationObj({
      id: '',
      certTitle: '',
      issuer: '',
      link: ''
    });
  };

  return (
    <>
      <DrawerButton section={section} isVisible={isVisible} />

      <div className={`${isVisible ? '' : 'closed'} editor-section`}>
        <DndList
          nameKey='certTitle'
          itemArr={certifications as ListProps[]}
          handleSort={sortCertifications}
          handleRemove={removeCertification}
        />

        <div>
          <span>
            <label htmlFor='certTitle'>Title</label>
            <input
              title=''
              type='text'
              id='certTitle'
              minLength={1}
              maxLength={128}
              value={certificationObj.certTitle}
              onInput={handleCertificationInput}
              autoCapitalize='words'
            />
          </span>
        </div>

        <div className='two-column'>
          <span>
            <label htmlFor='issuer'>Issuer</label>
            <input
              title=''
              type='text'
              id='issuer'
              minLength={1}
              maxLength={128}
              value={certificationObj.issuer}
              onInput={handleCertificationInput}
              autoCapitalize='words'
            />
          </span>

          <span>
            <label htmlFor='link'>
              Link <FontAwesomeIcon size='sm' icon={faLink} />
            </label>
            <input
              title=''
              type='text'
              id='link'
              minLength={1}
              maxLength={128}
              value={certificationObj.link}
              onInput={handleCertificationInput}
              autoCapitalize='words'
            />
          </span>
        </div>

        <button
          type='button'
          className='add-btn'
          onClick={handleAddCertification}
          disabled={isDisabled}>
          Add
        </button>
      </div>
    </>
  );
};
