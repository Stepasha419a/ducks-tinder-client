import type { FC, ReactElement } from 'react';
import { LikesCount } from '@/entities/user/ui';
import { Pairs } from '@/widgets/ui';

const PairsPage: FC = (): ReactElement => (
  <>
    <LikesCount />
    <Pairs />
  </>
);

export default PairsPage;
