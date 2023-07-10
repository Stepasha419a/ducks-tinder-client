import type { FC, PropsWithChildren } from 'react';

export const Dots: FC<PropsWithChildren> = ({ children }) => (
  <div
    style={{
      position: 'absolute',
      top: 0,
      width: '100%',
      height: '20px',
      zIndex: 2,
    }}
  >
    <ul
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'nowrap',
        padding: '0 8px',
      }}
    >
      {children}
    </ul>
  </div>
);
