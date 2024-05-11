import type { FC, ReactElement } from 'react';
import { TinderUser } from '@/widgets/TinderUser/TinderUser';
import { Instructions } from './components';

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
