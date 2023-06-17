import { Button } from '@shared/ui';
//import { useAppDispatch } from '@hooks';
//import { updateUserThunk } from '@entities/user/model';
import styles from './ResetCheckedUsers.module.scss';

// Only for developing to reset checked users => like/dislike everyone again
export const ResetCheckedUsers = () => {
  //const dispatch = useAppDispatch();
  const resetHandler = (): void => {
    /* dispatch(
      updateUserThunk({
        inputName: 'checkedUsers',
        changedData: [],
      })
    ); */
  };

  return (
    <Button onClick={() => resetHandler()} extraClassName={styles.reset}>
      reset
    </Button>
  );
};
