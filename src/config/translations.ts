const SKILLSETS_AZE = {
  progLang: 'Proqramlaşdırma Dilləri',
  libFrame: 'Kitabxanalar / Freymvorklar',
  toolPlat: 'Alətlər / Platformalar',
  databases: 'Data Bazalar'
} as const;

const ACTIONS_AZE = {
  add: 'Əlavə et',
  reset: 'Sıfırla',
  download: 'Yüklə',
  edit: 'Redaktə et',
  remove: 'Sil',
  reorder: 'Sırala'
} as const;

const SECTIONS_AZE = {
  Personal: 'Şəxsi',
  Experience: 'Təcrübə',
  Education: 'Təhsil',
  Skills: 'Bacarıqlar',
  Projects: 'Layihələr',
  Certifications: 'Sertifikatlar'
} as const;

const PERSONAL_AZE = {
  fullName: 'Ad',
  profession: 'Peşə',
  phone: 'Telefon',
  address: 'Ünvan'
} as const;

const EXPERIENCE_AZE = {
  employer: 'Müəssisə',
  position: 'Vəzifə',
  location: 'Məkan',
  startDate: 'Başlama tarixi',
  endDate: 'Bitmə tarixi',
  description: 'Ətraflı'
} as const;

const EDUCATION_AZE = {
  college: 'Təhsil Müəssisəsi',
  major: 'İxtisas',
  degree: 'Dərəcə',
  startYear: 'Başlama ili',
  endYear: 'Bitirmə ili'
} as const;

const PROJECTS_AZE = {
  name: 'Ad',
  link: 'Keçid',
  stack: 'Texnologiya',
  description: 'Ətraflı'
};

const CERTIFICATIONS_AZE = {
  title: 'Başlıq',
  issuer: 'Təşkilat',
  link: 'Keçid'
};

export {
  SKILLSETS_AZE,
  ACTIONS_AZE,
  SECTIONS_AZE,
  PERSONAL_AZE,
  EXPERIENCE_AZE,
  EDUCATION_AZE,
  PROJECTS_AZE,
  CERTIFICATIONS_AZE
};
