import type { FC, ReactElement } from 'react';
import { RateUser } from '@features/tinder';
import { Instructions } from './components';
import styles from './Tinder.module.scss';
import { useMediaQuery } from '@/shared/lib/hooks';
import classNames from 'classnames';

const Tinder: FC = (): ReactElement => {
  const isMobile = useMediaQuery('(max-width: 900px)');

  return (
    <>
      <div className={classNames(styles.wrapper, isMobile && styles.mobile)}>
        <div className={styles.users}>
          <RateUser />
        </div>
      </div>
      <Instructions />
    </>
  );
};

export default Tinder;
