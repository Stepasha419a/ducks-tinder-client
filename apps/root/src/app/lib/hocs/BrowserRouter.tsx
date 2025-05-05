import type { ComponentType } from 'react';
import { BrowserRouter } from 'react-router-dom';

export const WithBrowserRouter = (Component: ComponentType) => () => {
  return (
    <BrowserRouter>
      <Component />
    </BrowserRouter>
  );
};
