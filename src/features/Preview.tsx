import type { ReactElement, RefObject } from 'react';

import { PCertificates } from '@/components/preview/PCertificates.tsx';
import { PEducation } from '@/components/preview/PEducation.tsx';
import { PExperience } from '@/components/preview/PExperience.tsx';
import { PPerson } from '@/components/preview/PPerson.tsx';
import { PProjects } from '@/components/preview/PProjects.tsx';
import { PSkills } from '@/components/preview/PSkills.tsx';

export const Preview = ({
  printRef,
}: {
  printRef: RefObject<HTMLElement | null>;
}): ReactElement => (
  <main id='preview' ref={printRef}>
    <PPerson />
    <PExperience />
    <PEducation />
    <PSkills />
    <PProjects />
    <PCertificates />
  </main>
);
