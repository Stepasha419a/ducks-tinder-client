import { Button } from '@shared/ui';
import { instance } from '@shared/api';
import styles from './ResetCheckedUsers.module.scss';

// Only for developing to reset checked users => like/dislike everyone again
export const ResetCheckedUsers = () => {
  const resetHandler = (): void => {
    instance.post('users/removeAllPairs');
  };

  return (
    <Button onClick={resetHandler} extraClassName={styles.reset}>
      reset
    </Button>
  );
};
