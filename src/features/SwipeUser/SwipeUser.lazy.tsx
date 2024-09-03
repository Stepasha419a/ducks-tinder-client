import classNames from 'classnames';
import type { FC } from 'react';
import { Skeleton } from '@shared/ui';
import styles from './SwipeUser.module.scss';

interface SwipeUserLazyProps {
  small?: boolean;
}

export const SwipeUserLazy: FC<SwipeUserLazyProps> = ({ small }) => {
  return (
    <Skeleton
      containerClassName={classNames(styles.lazy, small && styles.small)}
      count={1}
      width={'100%'}
      height={'100%'}
      duration={1}
    />
  );
};
