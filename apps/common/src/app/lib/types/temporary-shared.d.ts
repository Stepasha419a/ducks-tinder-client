/* eslint-disable @typescript-eslint/no-useless-empty-export */
/* eslint-disable @typescript-eslint/consistent-type-imports */

// TODO: temporary
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type store = any;

declare global {
  export type RootStore = ReturnType<store>;
  export type RootState = ReturnType<store>;
  export type AppDispatch = store;
}

export {};
