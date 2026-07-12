import { useModalStore } from './modal.store';

import { getModalName } from './modal.helper';
import type { ComponentType, FC } from 'react';

interface OpenModalPayload<T> {
  Component: React.FC | React.ComponentType;
  props?: T;
}

export const useOpenModal = () => {
  const openModal = useModalStore((state) => state.openModal);

  const handleOpenModal = async <T, TResult = never>(
    payload: OpenModalPayload<T>
  ) => {
    return openModal<T, TResult>({
      name: getModalName(payload.Component),
      props: payload.props,
    });
  };

  return {
    openModal: handleOpenModal,
  };
};

export const useModalProps = <P = unknown>(
  modalComponent: ComponentType | FC
) => {
  const openedModal = useModalStore((state) =>
    state.openedModals.find(
      (modal) => modal.name === getModalName(modalComponent)
    )
  );
  const props = openedModal?.props as P;

  const closeModal = useModalStore((state) => state.closeModal);

  const resolveModal = <T>(result: T | null) => {
    closeModal(result);
  };

  return {
    props,
    resolveModal,
  };
};
