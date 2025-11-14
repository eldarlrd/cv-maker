import { faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { nanoid } from 'nanoid';
import { type ChangeEvent, type ReactElement, useState } from 'react';

import { DndList, type ListProps } from '@/components/editor/menus/DndList.tsx';
import { DrawerButton } from '@/components/editor/menus/DrawerButton.tsx';
import { ACTIONS_ENG, CERTIFICATIONS_ENG } from '@/config/fields.ts';
import { ACTIONS_AZE, CERTIFICATIONS_AZE } from '@/config/translations.ts';
import { type CertificationDetails } from '@/slices/certificationsSlice.ts';
import { LANGUAGES } from '@/slices/languageSlice.ts';
import { useStore } from '@/store.ts';

export const ECertifications = (): ReactElement => {
  const section = 'Certifications';
  const {
    certifications,
    sortCertifications,
    addCertification,
    removeCertification,
    openMenus,
    language
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

  const editCertification = (id: string): void => {
    const certificationToEdit = certifications.find(c => c.id === id);

    if (certificationToEdit) {
      setCertificationObj(certificationToEdit);
      removeCertification(id);
    }
  };

  const isEnglish = language === LANGUAGES.English;

  return (
    <>
      <DrawerButton section={section} isVisible={isVisible} />

      <div className={`${isVisible ? '' : 'closed'} editor-section`}>
        <DndList
          nameKey='certTitle'
          itemArr={certifications as ListProps[]}
          handleSort={sortCertifications}
          handleEdit={editCertification}
          handleRemove={removeCertification}
        />

        <div>
          <span>
            <label htmlFor='certTitle'>
              {isEnglish ? CERTIFICATIONS_ENG.title : CERTIFICATIONS_AZE.title}
            </label>
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
            <label htmlFor='issuer'>
              {isEnglish ?
                CERTIFICATIONS_ENG.issuer
              : CERTIFICATIONS_AZE.issuer}
            </label>
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
              {isEnglish ? CERTIFICATIONS_ENG.link : CERTIFICATIONS_AZE.link}{' '}
              <FontAwesomeIcon size='sm' icon={faLink} />
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
          {isEnglish ? ACTIONS_ENG.add : ACTIONS_AZE.add}
        </button>
      </div>
    </>
  );
};
