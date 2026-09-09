import type { CertificationDetails } from '$/certificationsSlice.ts';
import type { EducationDetails } from '$/educationSlice.ts';
import type { ExperienceDetails } from '$/experienceSlice.ts';
import type { ProjectDetails } from '$/projectsSlice.ts';

interface ListItemProps {
  id: string;
  name: string;
}

interface ListProps
  extends ExperienceDetails,
    EducationDetails,
    ProjectDetails,
    CertificationDetails {}

export type { ListItemProps, ListProps };
