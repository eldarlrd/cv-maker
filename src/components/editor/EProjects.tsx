import { faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { nanoid } from 'nanoid';
import { type ChangeEvent, type ReactElement, useState } from 'react';

import { ACTIONS_ENG, PROJECTS_ENG } from '#/fields.ts';
import { ACTIONS_AZE, PROJECTS_AZE } from '#/translations.ts';
import { DndList } from '@/components/editor/menus/DndList.tsx';
import { DrawerButton } from '@/components/editor/menus/DrawerButton.tsx';
import { useStore } from '@/store.ts';
import type { ListProps } from '%/dndList.model.ts';
import { LANGUAGES } from '$/languageSlice.ts';
import type { ProjectDetails } from '$/projectsSlice.ts';

export const EProjects = (): ReactElement => {
  const section = 'Projects';
  const { projects, sortProjects, addProject, removeProject, openMenus, language } = useStore();
  const isVisible = openMenus.includes(section);

  const [projectObj, setProjectObj] = useState<ProjectDetails>({
    id: '',
    projDescriptions: [],
    projLink: '',
    projName: '',
    stack: '',
  });

  const isDisabled =
    !(projectObj.projName && projectObj.stack && projectObj.projDescriptions.length > 0) ||
    projectObj.projDescriptions.some((desc) => desc.trim() === '');

  const handleProjectInput = (e: ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = e.target;

    setProjectObj((prevObj) => ({
      ...prevObj,
      [id]: value,
    }));
  };

  const handleProjDescriptionsInput = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    const projDescriptions = e.target.value.split('\n\n');

    setProjectObj({
      ...projectObj,
      projDescriptions,
    });
  };

  const handleAddProject = (): void => {
    addProject({
      ...projectObj,
      id: nanoid(),
    });
    setProjectObj({
      id: '',
      projDescriptions: [],
      projLink: '',
      projName: '',
      stack: '',
    });
  };

  const editProject = (id: string): void => {
    const projectToEdit = projects.find((p) => p.id === id);

    if (projectToEdit) {
      setProjectObj(projectToEdit);
      removeProject(id);
    }
  };

  const isEnglish = language === LANGUAGES.English;

  return (
    <>
      <DrawerButton isVisible={isVisible} section={section} />

      <div className={`${isVisible ? '' : 'closed'} editor-section`}>
        <DndList
          handleEdit={editProject}
          handleRemove={removeProject}
          handleSort={sortProjects}
          itemArr={projects as ListProps[]}
          nameKey='projName'
        />

        <div className='two-column'>
          <span>
            <label htmlFor='projName'>{isEnglish ? PROJECTS_ENG.name : PROJECTS_AZE.name}</label>
            <input
              autoCapitalize='words'
              autoComplete='on'
              id='projName'
              maxLength={128}
              minLength={1}
              onChange={handleProjectInput}
              title=''
              type='text'
              value={projectObj.projName}
            />
          </span>

          <span>
            <label htmlFor='projLink'>
              {isEnglish ? PROJECTS_ENG.link : PROJECTS_AZE.link}{' '}
              <FontAwesomeIcon icon={faLink} size='sm' />
            </label>
            <input
              autoCapitalize='words'
              id='projLink'
              maxLength={128}
              minLength={1}
              onChange={handleProjectInput}
              title=''
              type='text'
              value={projectObj.projLink}
            />
          </span>
        </div>

        <div id='editor-project-stack'>
          <span>
            <label htmlFor='stack'> {isEnglish ? PROJECTS_ENG.stack : PROJECTS_AZE.stack}</label>
            <input
              autoCapitalize='words'
              id='stack'
              maxLength={256}
              minLength={1}
              onChange={handleProjectInput}
              title=''
              type='text'
              value={projectObj.stack}
            />
          </span>
        </div>

        <span>
          <label htmlFor='projDescriptions'>
            {' '}
            {isEnglish ? PROJECTS_ENG.description : PROJECTS_AZE.description}
          </label>
          <textarea
            id='projDescriptions'
            maxLength={4000}
            minLength={1}
            onChange={handleProjDescriptionsInput}
            rows={6}
            spellCheck={false}
            title=''
            value={projectObj.projDescriptions.join('\n\n')}
          />
        </span>

        <button className='add-btn' disabled={isDisabled} onClick={handleAddProject} type='button'>
          {isEnglish ? ACTIONS_ENG.add : ACTIONS_AZE.add}
        </button>
      </div>
    </>
  );
};
