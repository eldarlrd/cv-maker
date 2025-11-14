import { type ReactElement } from 'react';

import { PROJECTS_ENG } from '@/config/fields.ts';
import { PROJECTS_AZE, SECTIONS_AZE } from '@/config/translations.ts';
import { LANGUAGES } from '@/slices/languageSlice.ts';
import { useStore } from '@/store.ts';

export const PProjects = (): ReactElement => {
  const section = 'Projects';
  const { projects, language } = useStore();

  const hasProjects = projects.length > 0;
  const isEnglish = language === LANGUAGES.English;
  const divider = ' | ';

  return (
    <div className='content complex'>
      {hasProjects && (
        <>
          <h1>
            {isEnglish ?
              section.toUpperCase()
            : SECTIONS_AZE[section].toLocaleUpperCase('az')}
          </h1>

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
                        {isEnglish ? PROJECTS_ENG.link : PROJECTS_AZE.link}
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
