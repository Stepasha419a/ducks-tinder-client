import type { FC, ReactElement } from 'react';

import { TinderUser } from '@widgets/TinderUser';

import { Instructions } from './ui';

interface TinderProps {
  explore?: boolean;
}

const Tinder: FC<TinderProps> = ({ explore }): ReactElement => {
  return (
    <>
      <TinderUser explore={explore} />
      <Instructions explore={explore} />
    </>
  );
};

export default Tinder;
