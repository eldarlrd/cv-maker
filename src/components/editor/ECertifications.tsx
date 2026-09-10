import { faLink, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { nanoid } from 'nanoid';
import { type ChangeEvent, type ReactElement, useState } from 'react';

import { ACTIONS_ENG, CERTIFICATIONS_ENG } from '#/fields.ts';
import { ACTIONS_AZE, CERTIFICATIONS_AZE } from '#/translations.ts';
import { DndList } from '@/components/editor/menus/DndList.tsx';
import { DrawerButton } from '@/components/editor/menus/DrawerButton.tsx';
import { useStore } from '@/store.ts';
import type { ListProps } from '%/dndList.model.ts';
import type { CertificationDetails } from '$/certificationsSlice.ts';
import { LANGUAGES } from '$/languageSlice.ts';

export const ECertifications = (): ReactElement => {
  const section = 'Certifications';
  const {
    certifications,
    sortCertifications,
    addCertification,
    removeCertification,
    openMenus,
    language,
  } = useStore();
  const isVisible = openMenus.includes(section);

  const [certificationObj, setCertificationObj] = useState<CertificationDetails>({
    certTitle: '',
    id: '',
    issuer: '',
    link: '',
  });

  const isDisabled = !(certificationObj.certTitle && certificationObj.issuer);

  const handleCertificationInput = (e: ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = e.target;

    setCertificationObj((prevObj) => ({
      ...prevObj,
      [id]: value,
    }));
  };

  const handleAddCertification = (): void => {
    addCertification({
      ...certificationObj,
      id: nanoid(),
    });
    setCertificationObj({
      certTitle: '',
      id: '',
      issuer: '',
      link: '',
    });
  };

  const editCertification = (id: string): void => {
    const certificationToEdit = certifications.find((c) => c.id === id);

    if (certificationToEdit) {
      setCertificationObj(certificationToEdit);
      removeCertification(id);
    }
  };

  const isEnglish = language === LANGUAGES.English;

  return (
    <>
      <DrawerButton isVisible={isVisible} section={section} />

      <div className={`${isVisible ? '' : 'closed'} editor-section`}>
        <DndList
          handleEdit={editCertification}
          handleRemove={removeCertification}
          handleSort={sortCertifications}
          itemArr={certifications as ListProps[]}
          nameKey='certTitle'
        />

        <div>
          <span>
            <label htmlFor='certTitle'>
              {isEnglish ? CERTIFICATIONS_ENG.title : CERTIFICATIONS_AZE.title}
            </label>
            <input
              autoCapitalize='words'
              id='certTitle'
              maxLength={128}
              minLength={1}
              onChange={handleCertificationInput}
              title=''
              type='text'
              value={certificationObj.certTitle}
            />
          </span>
        </div>

        <div className='two-column'>
          <span>
            <label htmlFor='issuer'>
              {isEnglish ? CERTIFICATIONS_ENG.issuer : CERTIFICATIONS_AZE.issuer}
            </label>
            <input
              autoCapitalize='words'
              id='issuer'
              maxLength={128}
              minLength={1}
              onChange={handleCertificationInput}
              title=''
              type='text'
              value={certificationObj.issuer}
            />
          </span>

          <span>
            <label htmlFor='link'>
              {isEnglish ? CERTIFICATIONS_ENG.link : CERTIFICATIONS_AZE.link}{' '}
              <FontAwesomeIcon icon={faLink} size='sm' />
            </label>
            <input
              autoCapitalize='words'
              id='link'
              maxLength={128}
              minLength={1}
              onChange={handleCertificationInput}
              title=''
              type='text'
              value={certificationObj.link}
            />
          </span>
        </div>

        <button
          className='add-btn'
          disabled={isDisabled}
          onClick={handleAddCertification}
          type='button'>
          <FontAwesomeIcon icon={faPlus} size='sm' />{' '}
          {isEnglish ? ACTIONS_ENG.add : ACTIONS_AZE.add}
        </button>
      </div>
    </>
  );
};
