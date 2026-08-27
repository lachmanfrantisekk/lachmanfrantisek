/**
 * Central place to edit personal / brand content.
 * Change values here — they flow through the entire site.
 * Leave a social link as an empty string to hide its icon automatically.
 */
export const site = {
  name: 'František Lachman',
  domain: 'frantiseklachman.com',
  url: 'https://frantiseklachman.com',

  // Contact email used by the footer and mailto links. Edit to your address.
  email: 'hello@frantiseklachman.com',

  // Set to false to hide the "available for work" indicator everywhere.
  available: true,

  // Social links. Empty string = hidden. Fill in your real profile URLs.
  social: {
    github: '',
    linkedin: '',
    instagram: '',
  },
} as const;
