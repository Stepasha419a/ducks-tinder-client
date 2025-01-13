import type { ComponentType } from 'react';
import { useEffect, type ReactElement } from 'react';
import { useAppDispatch, useAppSelector } from '@shared/lib';
import type { Theme } from '@shared/model';
import { setTheme } from '@shared/model';

export function WithTheme<P extends object>(Component: ComponentType<P>) {
  const Wrapper = (props: P): ReactElement<P> => {
    const dispatch = useAppDispatch();
    const theme = useAppSelector((state) => state.theme.theme);

    useEffect(() => {
      const savedTheme = localStorage.getItem('theme');
      if (isValidTheme(savedTheme)) {
        dispatch(setTheme(savedTheme as Theme));
        document.documentElement.setAttribute('data-theme', savedTheme!);
      } else {
        localStorage.setItem('theme', 'light');
        document.documentElement.setAttribute('data-theme', 'light');
      }
    }, [theme, dispatch]);

    return <Component {...props} />;
  };

  return Wrapper;
}

function isValidTheme(theme: string | null): boolean {
  switch (theme) {
    case 'light':
    case 'dark':
      return true;
    default:
      return false;
  }
}
