import type { ComponentType, FC } from 'react';
import { UI_MODALS } from './modal.constant';

export const getModalName = (Component: ComponentType | FC) => {
  if ('modalName' in Component && typeof Component.modalName == 'string') {
    return Component.modalName;
  }

  return 'unknown';
};

export const setModalName = (Component: ComponentType, modalName: string) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  Component.modalName = modalName;
};

export const addModal = (Component: ComponentType, modalName: string) => {
  setModalName(Component, modalName);

  UI_MODALS[modalName] = Component;
};
