// biome-ignore-all assist/source/useSortedKeys: intended order

// # Easily Translatable
const SKILLSETS_AZE = {
  progLang: 'Proqramlaşdırma dilləri',
  libFrame: 'Kitabxanalar / Freymvorklar',
  toolPlat: 'Alətlər / Platformalar',
  databases: 'Databazalar',
  languages: 'Dillər',
} as const;

const ACTIONS_AZE = {
  add: 'Əlavə et',
  clipboard: 'Nüsxələ',
  download: 'Yüklə',
  edit: 'Redaktə et',
  remove: 'Sil',
  reorder: 'Sırala',
  clear: 'Sıfırla',
  paste: 'Yapışdır',
} as const;

const CONFIRMATION_AZE = {
  message: 'Əminsiniz?',
  no: 'Xeyr',
  yes: 'Bəli',
} as const;

const SECTIONS_AZE = {
  Certifications: 'Sertifikatlar',
  Education: 'Təhsil',
  Experience: 'Təcrübə',
  Personal: 'Şəxsi',
  Projects: 'Layihələr',
  Skills: 'Bacarıqlar',
} as const;

const PERSONAL_AZE = {
  address: 'Ünvan',
  name: 'Ad',
  phone: 'Telefon',
  profession: 'Peşə',
} as const;

const EXPERIENCE_AZE = {
  description: 'Ətraflı',
  employer: 'Müəssisə',
  endDate: 'Bitmə tarixi',
  location: 'Məkan',
  position: 'Vəzifə',
  startDate: 'Başlama tarixi',
} as const;

const EDUCATION_AZE = {
  college: 'Müəssisə',
  degree: 'Dərəcə',
  endYear: 'Bitirmə ili',
  major: 'İxtisas',
  startYear: 'Başlama ili',
} as const;

const PROJECTS_AZE = {
  description: 'Ətraflı',
  link: 'Keçid',
  name: 'Ad',
  stack: 'Texnologiya',
};

const CERTIFICATIONS_AZE = {
  issuer: 'Təşkilat',
  link: 'Keçid',
  title: 'Başlıq',
};

const SOURCE_AZE = {
  source: 'Mənbə',
};

export {
  ACTIONS_AZE,
  CERTIFICATIONS_AZE,
  CONFIRMATION_AZE,
  EDUCATION_AZE,
  EXPERIENCE_AZE,
  PERSONAL_AZE,
  PROJECTS_AZE,
  SECTIONS_AZE,
  SKILLSETS_AZE,
  SOURCE_AZE,
};
