import { useModalStore } from './modal.store';

import { getModalName } from './modal.helper';
import type { ComponentType, FC } from 'react';
import { useEffect } from 'react';

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

export const useOpenReactiveModal = <T>(
  Component: OpenModalPayload<T>['Component'],
  props: OpenModalPayload<T>['props']
) => {
  const name = getModalName(Component);

  const openModal = useModalStore((state) => state.openModal);
  const updateModalProps = useModalStore((state) => state.updateModalProps);
  const isOpen = useModalStore((s) =>
    s.openedModals.some((modal) => modal.name === name)
  );

  useEffect(() => {
    if (isOpen) {
      updateModalProps({ name, props });
    }
  }, [props, isOpen, name, updateModalProps]);

  const handleOpenModal = async <TResult = never>() => {
    return openModal<T, TResult>({
      name: getModalName(Component),
      props: props,
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
