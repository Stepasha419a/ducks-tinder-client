import type { FC, ReactElement } from 'react';
import { LikesCount } from '@entities/user/components';
import { Pairs, SortPairs } from '@widgets';

const PairsPage: FC = (): ReactElement => (
  <>
    <LikesCount />
    <SortPairs />
    <Pairs />
  </>
);

export default PairsPage;
