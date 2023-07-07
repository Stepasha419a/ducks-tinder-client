import type { FC, ReactElement } from 'react';
import { Tinder } from '@widgets';
import { Instructions } from './components';

const TinderPage: FC = (): ReactElement => {
  return (
    <>
      <Tinder />
      <Instructions />
    </>
  );
};

export default TinderPage;
