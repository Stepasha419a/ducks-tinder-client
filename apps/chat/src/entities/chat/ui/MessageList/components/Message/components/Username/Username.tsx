import type { FC } from 'react';

import * as styles from './Username.module.scss';

interface UsernameProps {
  isOwn: boolean;
  username: string | undefined;
}

export const Username: FC<UsernameProps> = ({ isOwn, username }) => {
  if (isOwn) {
    return null;
  }

  return <div className={styles.username}>{username}</div>;
};
