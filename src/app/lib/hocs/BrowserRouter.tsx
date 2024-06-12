import type { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';

export const WithBrowserRouter = (Component: FC) => () => {
  return (
    <BrowserRouter>
      <Component />
    </BrowserRouter>
  );
};
