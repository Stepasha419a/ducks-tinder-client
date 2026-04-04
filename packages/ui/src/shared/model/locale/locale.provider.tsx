import { useMemo } from 'react';
import { LocaleContext, defaultLocale } from './locale.context';
import type { Locale } from './locale.interface';

interface Props {
  locale?: Locale;
}

export const LocaleProvider: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  locale,
}) => {
  const value: Locale = useMemo(() => locale || defaultLocale, [locale]);

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
};
