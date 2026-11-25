import type { CertificateDetails } from '$/certificatesSlice.ts';
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
    CertificateDetails {}

export type { ListItemProps, ListProps };
