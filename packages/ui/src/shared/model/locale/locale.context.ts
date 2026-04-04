import { createContext, useContext } from 'react';

import type { Locale } from './locale.interface';

export const defaultLocale: Locale = {
  distance: 'Lives in',
  livesIn: 'km from you',
  altAvatar: 'avatar',
  ariaOpenFullPreview: 'open user full preview',
  unknownPlace: 'unknown place',
  moreAboutMe: 'More about me',
  lifestyle: 'Lifestyle',
  interests: 'Interests',
  close: 'Close',
  showAll: 'Show all',
  ariaShowAllInterests: 'show all interests',
};

export const LocaleContext = createContext<Locale>(defaultLocale);

export const useLocaleContext = () => useContext(LocaleContext);
