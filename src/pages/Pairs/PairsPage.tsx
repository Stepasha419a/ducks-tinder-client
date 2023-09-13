import type { FC, ReactElement } from 'react';
import { LikesCount } from '@entities/user/components';
import { SortPairs } from '@widgets';
import { RatePairPopup, SetCurrentPair } from '@features/user';

const PairsPage: FC = (): ReactElement => (
  <>
    <LikesCount />
    <SortPairs />
    <SetCurrentPair />
    <RatePairPopup />
  </>
);

export default PairsPage;
