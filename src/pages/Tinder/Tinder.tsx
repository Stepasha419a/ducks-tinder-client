import type { FC, ReactElement } from 'react';
import { TinderUser } from '@/widgets/TinderUser/TinderUser';
import { Instructions } from './components';

const Tinder: FC = (): ReactElement => {
  return (
    <>
      <TinderUser />
      <Instructions />
    </>
  );
};

export default Tinder;
