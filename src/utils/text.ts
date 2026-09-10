import { LANGUAGES } from '$/languageSlice.ts';

const replacements: Record<string, string> = {
  Ç: 'Ch',
  Ö: 'O',
  Ü: 'U',
  ç: 'ch',
  ö: 'o',
  ü: 'u',
  Ğ: 'Gh',
  ğ: 'gh',
  İ: 'I',
  ı: 'i',
  Ş: 'Sh',
  ş: 'sh',
  Ə: 'A',
  ə: 'a',
};

const azReplacements: Record<string, string> = {
  C: 'J',
  c: 'j',
  X: 'Kh',
  x: 'kh',
};

const normalize = (str: string, lang = LANGUAGES.English): string => {
  let normalized = str.trim().replaceAll(/[əƏşŞıİüÜğĞöÖçÇ]/g, (letter) => replacements[letter]);

  if (lang === LANGUAGES.Azerbaijani)
    normalized = normalized.replaceAll(/[xXcC]/g, (letter) => azReplacements[letter]);

  return normalized.replaceAll(/[\p{P}\p{S}]/gu, (character) =>
    character === '-' ? character : ''
  );
};

const kebabize = (str: string): string => str.trim().replaceAll(' ', '_');

export { kebabize, normalize };
