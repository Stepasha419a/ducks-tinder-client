import type { FC, ReactElement } from 'react';
import { LikesCount } from '@entities/user/components';
import { Pairs } from '@widgets';

const PairsPage: FC = (): ReactElement => (
  <>
    <LikesCount />
    <Pairs />
  </>
);

export default PairsPage;
