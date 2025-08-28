import type { ComponentType } from 'react';
import { BrowserRouter } from 'react-router-dom';

export const WithBrowserRouter = (Component: ComponentType) => () => {
  return (
    <BrowserRouter basename={window._env_.VAR_ROOT_PATH || '/'}>
      <Component />
    </BrowserRouter>
  );
};
