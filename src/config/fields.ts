// biome-ignore-all assist/source/useSortedKeys: intended order

// # Easily Extendable
const SKILLSETS_ENG = {
  progLang: 'Programming languages',
  libFrame: 'Libraries / Frameworks',
  toolPlat: 'Tools / Platforms',
  databases: 'Databases',
  languages: 'Languages',
} as const;

const ACTIONS_ENG = {
  add: 'Add',
  clipboard: 'Copy',
  download: 'Download',
  edit: 'Edit',
  remove: 'Remove',
  reorder: 'Reorder',
  clear: 'Clear',
  paste: 'Paste',
} as const;

const PERSONAL_ENG = {
  address: 'Address',
  name: 'Name*',
  phone: 'Phone',
  profession: 'Profession*',
} as const;

const EXPERIENCE_ENG = {
  description: 'Description',
  employer: 'Employer',
  endDate: 'End date',
  location: 'Location',
  position: 'Position',
  startDate: 'Start date',
} as const;

const EDUCATION_ENG = {
  college: 'College',
  degree: 'Degree',
  endYear: 'End year',
  major: 'Major',
  startYear: 'Start year',
} as const;

const PROJECTS_ENG = {
  description: 'Description',
  link: 'Link',
  name: 'Name',
  stack: 'Stack',
};

const CERTIFICATIONS_ENG = {
  issuer: 'Issuer',
  link: 'Link',
  title: 'Title',
};

export {
  ACTIONS_ENG,
  CERTIFICATIONS_ENG,
  EDUCATION_ENG,
  EXPERIENCE_ENG,
  PERSONAL_ENG,
  PROJECTS_ENG,
  SKILLSETS_ENG,
};
