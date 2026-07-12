import { create } from 'zustand';

import type { ModalsStore, ModalPayload } from './modal.interface';

const resolvers = new Map<string, CallableFunction>();

export const useModalStore: ModalsStore = create((set) => ({
  openedModals: [],
  openModal: async <T, R>(payload: ModalPayload<T>) => {
    set((state) => {
      return {
        openedModals: [
          ...state.openedModals,
          {
            name: payload.name,
            props: payload.props || {},
            result: null,
          },
        ],
      };
    });

    return new Promise<R | null>((resolve) => {
      resolvers.set(payload.name, resolve);
    });
  },
  closeModal<TResult>(result: TResult | null) {
    const modal = useModalStore.getState().openedModals.at(-1);

    if (modal?.name) {
      resolvers.get(modal.name)?.(result);
    }

    set((state) => ({
      openedModals: state.openedModals.slice(0, state.openedModals.length - 1),
    }));
  },
}));
