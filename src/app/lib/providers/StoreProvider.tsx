import type { ComponentType } from 'react';
import { Provider } from 'react-redux';
import { store } from '@app/store';

export const StoreProvider = (Component: ComponentType) => () => {
  return (
    <Provider store={store}>
      <Component />
    </Provider>
  );
};
