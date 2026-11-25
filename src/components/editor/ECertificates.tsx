import { faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { nanoid } from 'nanoid';
import { type ChangeEvent, type ReactElement, useState } from 'react';

import { ACTIONS_ENG, CERTIFICATES_ENG } from '#/original.ts';
import { ACTIONS_AZE, CERTIFICATES_AZE } from '#/translation.ts';
import { DndList } from '@/components/editor/menus/DndList.tsx';
import { DrawerButton } from '@/components/editor/menus/DrawerButton.tsx';
import { useStore } from '@/store.ts';
import type { ListProps } from '%/dndList.model.ts';
import type { CertificateDetails } from '$/certificatesSlice.ts';
import { LANGUAGES } from '$/languageSlice.ts';

export const ECertificates = (): ReactElement => {
  const section = 'Certificates';
  const { certificates, sortCertificates, addCertificate, removeCertificate, openMenus, language } =
    useStore();
  const isVisible = openMenus.includes(section);

  const [certificateObj, setCertificateObj] = useState<CertificateDetails>({
    certTitle: '',
    id: '',
    issuer: '',
    link: '',
  });

  const isDisabled = !(certificateObj.certTitle && certificateObj.issuer);

  const handleCertificateInput = (e: ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = e.target;

    setCertificateObj((prevObj) => ({
      ...prevObj,
      [id]: value,
    }));
  };

  const handleAddCertificate = (): void => {
    addCertificate({
      ...certificateObj,
      id: nanoid(),
    });
    setCertificateObj({
      certTitle: '',
      id: '',
      issuer: '',
      link: '',
    });
  };

  const editCertificate = (id: string): void => {
    const certificateToEdit = certificates.find((c) => c.id === id);

    if (certificateToEdit) {
      setCertificateObj(certificateToEdit);
      removeCertificate(id);
    }
  };

  const isEnglish = language === LANGUAGES.English;

  return (
    <>
      <DrawerButton isVisible={isVisible} section={section} />

      <div className={`${isVisible ? '' : 'closed'} editor-section`}>
        <DndList
          handleEdit={editCertificate}
          handleRemove={removeCertificate}
          handleSort={sortCertificates}
          itemArr={certificates as ListProps[]}
          nameKey='certTitle'
        />

        <div>
          <span>
            <label htmlFor='certTitle'>
              {isEnglish ? CERTIFICATES_ENG.title : CERTIFICATES_AZE.title}
            </label>
            <input
              autoCapitalize='words'
              id='certTitle'
              maxLength={128}
              minLength={1}
              onChange={handleCertificateInput}
              required
              title=''
              type='text'
              value={certificateObj.certTitle}
            />
          </span>
        </div>

        <div className='two-column'>
          <span>
            <label htmlFor='issuer'>
              {isEnglish ? CERTIFICATES_ENG.issuer : CERTIFICATES_AZE.issuer}
            </label>
            <input
              autoCapitalize='words'
              id='issuer'
              maxLength={128}
              minLength={1}
              onChange={handleCertificateInput}
              required
              title=''
              type='text'
              value={certificateObj.issuer}
            />
          </span>

          <span>
            <label htmlFor='link'>
              {isEnglish ? CERTIFICATES_ENG.link : CERTIFICATES_AZE.link}{' '}
              <FontAwesomeIcon icon={faLink} size='sm' />
            </label>
            <input
              autoCapitalize='words'
              id='link'
              maxLength={128}
              minLength={1}
              onChange={handleCertificateInput}
              title=''
              type='text'
              value={certificateObj.link}
            />
          </span>
        </div>

        <button
          className='add-btn'
          disabled={isDisabled}
          onClick={handleAddCertificate}
          type='button'>
          {isEnglish ? ACTIONS_ENG.add : ACTIONS_AZE.add}
        </button>
      </div>
    </>
  );
};
