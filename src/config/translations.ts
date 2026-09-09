const SKILLSETS_AZE = {
  databases: 'Data Bazalar',
  languages: 'Dillər',
  libFrame: 'Kitabxanalar / Freymvorklar',
  progLang: 'Proqramlaşdırma Dilləri',
  toolPlat: 'Alətlər / Platformalar',
} as const;

const ACTIONS_AZE = {
  add: 'Əlavə et',
  download: 'Yüklə',
  edit: 'Redaktə et',
  remove: 'Sil',
  reorder: 'Sırala',
  reset: 'Sıfırla',
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
  fullName: 'Ad',
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
  college: 'Təhsil Müəssisəsi',
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

export {
  ACTIONS_AZE,
  CERTIFICATIONS_AZE,
  EDUCATION_AZE,
  EXPERIENCE_AZE,
  PERSONAL_AZE,
  PROJECTS_AZE,
  SECTIONS_AZE,
  SKILLSETS_AZE,
};
