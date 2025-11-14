// * Ease of Access
const SKILLSETS_ENG = {
  progLang: 'Programming Languages',
  libFrame: 'Libraries / Frameworks',
  toolPlat: 'Tools / Platforms',
  databases: 'Databases'
} as const;

const ACTIONS_ENG = {
  add: 'Add',
  reset: 'Reset',
  download: 'Download',
  edit: 'Edit',
  remove: 'Remove',
  reorder: 'Reorder'
} as const;

const PERSONAL_ENG = {
  fullName: 'Full Name',
  profession: 'Profession',
  phone: 'Phone',
  address: 'Address'
} as const;

const EXPERIENCE_ENG = {
  employer: 'Employer',
  position: 'Position',
  location: 'Location',
  startDate: 'Start date',
  endDate: 'End date',
  description: 'Description'
} as const;

const EDUCATION_ENG = {
  college: 'College',
  major: 'Major',
  degree: 'Degree',
  startYear: 'Start year',
  endYear: 'End year'
} as const;

const PROJECTS_ENG = {
  name: 'Name',
  link: 'Link',
  stack: 'Stack',
  description: 'Description'
};

const CERTIFICATIONS_ENG = {
  title: 'Title',
  issuer: 'Issuer',
  link: 'Link'
};

export {
  SKILLSETS_ENG,
  ACTIONS_ENG,
  PERSONAL_ENG,
  EXPERIENCE_ENG,
  EDUCATION_ENG,
  PROJECTS_ENG,
  CERTIFICATIONS_ENG
};
