import { faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { nanoid } from 'nanoid';
import { useState, type ReactElement, type ChangeEvent } from 'react';

import { DndList, type ListProps } from '@/components/editor/menus/DndList.tsx';
import { DrawerButton } from '@/components/editor/menus/DrawerButton.tsx';
import { type ProjectDetails } from '@/slices/projectsSlice.ts';
import { useStore } from '@/store.ts';

export const EProjects = (): ReactElement => {
  const section = 'Projects';
  const { projects, sortProjects, addProject, removeProject, openMenus } =
    useStore();
  const isVisible = openMenus.includes(section);

  const [projectObj, setProjectObj] = useState<ProjectDetails>({
    id: '',
    projName: '',
    projLink: '',
    stack: '',
    projDescriptions: []
  });

  const isDisabled =
    !projectObj.projName ||
    !projectObj.stack ||
    !(projectObj.projDescriptions.length > 0) ||
    projectObj.projDescriptions.some(desc => desc.trim() === '');

  const handleProjectInput = (e: ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = e.target;

    setProjectObj(prevObj => ({
      ...prevObj,
      [id]: value
    }));
  };

  const handleProjDescriptionsInput = (
    e: ChangeEvent<HTMLTextAreaElement>
  ): void => {
    const projDescriptions = e.target.value.split('\n\n');

    setProjectObj({
      ...projectObj,
      projDescriptions
    });
  };

  const handleAddProject = (): void => {
    addProject({
      ...projectObj,
      id: nanoid()
    });
    setProjectObj({
      id: '',
      projName: '',
      projLink: '',
      stack: '',
      projDescriptions: []
    });
  };

  const editProject = (id: string): void => {
    const projectToEdit = projects.find(p => p.id === id);

    if (projectToEdit) {
      setProjectObj(projectToEdit);
      removeProject(id);
    }
  };

  return (
    <>
      <DrawerButton section={section} isVisible={isVisible} />

      <div className={`${isVisible ? '' : 'closed'} editor-section`}>
        <DndList
          nameKey='projName'
          itemArr={projects as ListProps[]}
          handleSort={sortProjects}
          handleEdit={editProject}
          handleRemove={removeProject}
        />

        <div className='two-column'>
          <span>
            <label htmlFor='projName'>Name</label>
            <input
              title=''
              type='text'
              id='projName'
              minLength={1}
              maxLength={128}
              value={projectObj.projName}
              onInput={handleProjectInput}
              autoCapitalize='words'
              autoComplete='on'
            />
          </span>

          <span>
            <label htmlFor='projLink'>
              Link <FontAwesomeIcon size='sm' icon={faLink} />
            </label>
            <input
              title=''
              type='text'
              id='projLink'
              minLength={1}
              maxLength={128}
              value={projectObj.projLink}
              onInput={handleProjectInput}
              autoCapitalize='words'
            />
          </span>
        </div>

        <div id='editor-project-stack'>
          <span>
            <label htmlFor='stack'>Stack</label>
            <input
              title=''
              type='text'
              id='stack'
              minLength={1}
              maxLength={256}
              value={projectObj.stack}
              onInput={handleProjectInput}
              autoCapitalize='words'
            />
          </span>
        </div>

        <span>
          <label htmlFor='projDescriptions'>Description</label>
          <textarea
            title=''
            rows={6}
            minLength={1}
            maxLength={4000}
            id='projDescriptions'
            spellCheck={false}
            value={projectObj.projDescriptions.join('\n\n')}
            onInput={handleProjDescriptionsInput}
          />
        </span>

        <button
          type='button'
          className='add-btn'
          onClick={handleAddProject}
          disabled={isDisabled}>
          Add
        </button>
      </div>
    </>
  );
};
