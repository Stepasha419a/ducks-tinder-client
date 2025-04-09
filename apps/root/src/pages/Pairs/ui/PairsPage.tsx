import type { FC, ReactElement } from 'react';

import { Pairs } from '@widgets/Pairs';
import { LikesCount } from '@entities/user';

const PairsPage: FC = (): ReactElement => (
  <>
    <LikesCount />
    <Pairs />
  </>
);

export default PairsPage;
