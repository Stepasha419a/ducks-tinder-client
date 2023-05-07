import type { FC, ReactElement } from 'react';
import { LikesCount } from '@entities/user/components';
import { Nav, Pairs, SortPairs } from '@widgets';
import { withPrivatePageHocs } from '@hocs';
import styles from './PairsPage.module.scss';

const PairsPage: FC = (): ReactElement => (
  <div className={styles.main}>
    <Nav />
    <div className={styles.content}>
      <LikesCount />
      <SortPairs />
      <Pairs />
    </div>
  </div>
);

export default withPrivatePageHocs(PairsPage);
