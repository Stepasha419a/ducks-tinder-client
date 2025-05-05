import { Button } from '@ducks-tinder-client/ui';

import styles from './Explore.module.scss';

export const Explore = () => {
  return (
    <div className={styles.explore}>
      <Button className={styles.close} />
      <h2 className={styles.title}>Ищу любовь</h2>
    </div>
  );
};
