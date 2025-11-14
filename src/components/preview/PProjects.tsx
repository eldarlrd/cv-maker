import { type ReactElement } from 'react';

import { useStore } from '@/store.ts';

export const PProjects = (): ReactElement => {
  const { projects } = useStore();

  const hasProjects = projects.length > 0;
  const divider = ' | ';

  return (
    <div className='content complex'>
      {hasProjects && (
        <>
          <h1>PROJECTS</h1>

          {projects.map(project => (
            <div key={project.id}>
              <span>
                <h2>
                  {project.projName}
                  {project.projLink && (
                    <>
                      {divider}
                      <a
                        href={project.projLink}
                        title={project.projLink}
                        rel='noreferrer'>
                        Link
                      </a>
                    </>
                  )}
                </h2>

                <h3>{project.stack.trim()}</h3>
              </span>

              <ul>
                {project.projDescriptions.map(projDescription => (
                  <li key={projDescription}>{projDescription.trim()}</li>
                ))}
              </ul>
            </div>
          ))}
        </>
      )}
    </div>
  );
};
