import classNames from 'classnames';

import { Skeleton } from '@ducks-tinder-client/ui';

import * as styles from './Pair.module.scss';

export const PairLazy = () => {
  return (
    <Skeleton
      className={classNames(styles.pair, styles.lazy)}
      count={1}
      duration={1}
    />
  );
};
