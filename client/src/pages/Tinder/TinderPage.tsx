import type { FC, ReactElement } from 'react';
import { Nav, Tinder } from '@widgets';
import { Instructions } from './components';
import { withPrivatePageHocs } from '@shared/hocs';
import styles from './Tinder.module.scss';

const TinderPage: FC = (): ReactElement => {
  return (
    <div className={styles.main}>
      <Nav />
      <div className={styles.content}>
        <Tinder />
        <Instructions />
      </div>
    </div>
  );
};

export default withPrivatePageHocs(TinderPage);
