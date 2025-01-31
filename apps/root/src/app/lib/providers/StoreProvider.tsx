import type { ComponentType } from 'react';
import { Provider } from 'react-redux';
import { store } from '@app/model';

// TODO: provider expects children as a FC, not ComponentType
export const StoreProvider = (Component: ComponentType) => () => {
  return (
    <Provider store={store}>
      <Component />
    </Provider>
  );
};
