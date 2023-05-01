import type { FC, PropsWithChildren } from 'react';
import { Button } from '@shared/ui';
import styles from './ImagesFormWrapper.module.scss';

interface ImagesFormWrapperProps {
  setIsImageSetting: (isImageSetting: boolean) => void;
}

export const ImagesFormWrapper: FC<
  PropsWithChildren<ImagesFormWrapperProps>
> = ({ children, setIsImageSetting }) => {
  return (
    <div className={styles.change}>
      {children}
      <div className={styles.descr}>
        Add more photos to fill out your profile
        <br />
        by another 4% and get more likes.
      </div>
      <div className={styles.save}>
        <Button
          onClick={() => setIsImageSetting(false)}
          variant="gradient"
          extraClassName={styles.btn}
        >
          Save changes
        </Button>
      </div>
    </div>
  );
};
