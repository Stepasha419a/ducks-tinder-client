import styles from './Tinder.module.scss';
import { Skeleton } from '@shared/ui';

export const TinderLazy = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.users}>
        <Skeleton count={1} width={'100%'} height={'100%'} duration={1} />
      </div>
    </div>
  );
};
