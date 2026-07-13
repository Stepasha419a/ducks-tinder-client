import { UI_MODALS, useModalStore } from '@shared/model';
import type { ComponentType, FC } from 'react';

const Modals = () => {
  const openedModals = useModalStore((state) => state.openedModals);

  if (openedModals.length === 0) {
    return null;
  }

  return openedModals.map((modal) => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!UI_MODALS[modal.name]) {
      console.error('undefined modal', { modal });
      return null;
    }

    const Component = UI_MODALS[modal.name];

    return <Component {...(modal.props as object)} key={modal.name} />;
  });
};

export const WithModals = <P extends object>(
  Component: ComponentType<P>
): FC<P> => {
  const Wrapper = (props: P) => {
    return (
      <>
        <Modals />
        <Component {...props} />
      </>
    );
  };

  return Wrapper;
};
