import type { Dispatch, FC, SetStateAction } from 'react';
import classNames from 'classnames';
import { motion } from 'motion/react';

import type { ShortUser } from '@ducks-tinder-client/common';
import { useAdaptiveMediaQuery } from '@ducks-tinder-client/common';
import { Preview } from '@ducks-tinder-client/ui';

import { useSwipe } from './lib';
import { Status } from './ui';
import * as styles from './SwipeUser.module.scss';
import type { TinderAnimations } from '@entities/user';

interface Props {
  user: ShortUser;
  onChangeX?: (value: number, userId: string) => void;
  onChangeY?: (value: number, userId: string) => void;
  isFullPreview: boolean;
  setIsFullPreview: Dispatch<SetStateAction<boolean>>;
  disabled?: boolean;
  overriddenAnimation: {
    userId: string;
    animation: TinderAnimations;
  } | null;
  onSubmit: () => void;
}

export const SwipeUser: FC<Props> = ({
  user,
  disabled,
  onChangeX,
  onChangeY,
  isFullPreview,
  setIsFullPreview,
  onSubmit,
  overriddenAnimation,
}) => {
  const isMobile = useAdaptiveMediaQuery('(max-width: 900px)');

  const { motionProps, statusProps, previewProps } = useSwipe({
    isFullPreview,
    setIsFullPreview,
    disabled,
    onChangeX,
    onChangeY,
    userId: user.id,
    onSubmit,
    overriddenAnimation,
  });

  return (
    <motion.div className={styles.swipeUser} {...motionProps}>
      {!previewProps.isFull && <Status {...statusProps} />}
      <Preview
        user={user}
        extraClassName={classNames(
          previewProps.isFull ? styles.padding : styles.grabbing,
          isMobile && styles.mobile
        )}
        {...previewProps}
      />
    </motion.div>
  );
};
