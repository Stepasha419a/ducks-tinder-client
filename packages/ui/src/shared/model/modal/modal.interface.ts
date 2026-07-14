import type { StoreApi, UseBoundStore } from 'zustand';

export interface ModalPayload<T> {
  name: string;
  props?: T;
}

export interface OpenedModal {
  name: string;
  props?: unknown;
  result?: unknown;
}

export type ModalsState = {
  openedModals: OpenedModal[];
};

export interface ModalsActions {
  openModal<T, R>(payload: ModalPayload<T>): Promise<R | null>;
  updateModalProps<T>(payload: ModalPayload<T>): void;
  closeModal<TResult>(result: TResult | null): void;
}

export type ModalsStore = UseBoundStore<StoreApi<ModalsState & ModalsActions>>;
