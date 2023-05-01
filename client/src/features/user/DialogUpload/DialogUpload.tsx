import type { ChangeEvent, FC } from 'react';
import { Popup } from '@shared/ui';
import { setImageChange, setIsDialogUploadOpen } from '@entities/user/model';
import { useAppDispatch } from '@hooks';
import { createFileUrl } from '@shared/helpers';
import styles from './DialogUpload.module.scss';

export const DialogUpload: FC = () => {
  const dispatch = useAppDispatch();

  const handleImage = (e: ChangeEvent<HTMLInputElement>): void => {
    dispatch(setImageChange(createFileUrl(e.target.files![0])));
  };

  return (
    <Popup size="s" closeHandler={() => dispatch(setIsDialogUploadOpen(false))}>
      <div className={styles.title}>Upload</div>
      <div className={styles.descr}>Choose context type</div>
      <div className={styles.wrapper}>
        <div className={styles.input}>
          <label className={styles.label}>
            <span className={styles.span}>
              Upload from
              <br />
              <span className={styles.boldSpan}>Gallery</span>
            </span>
            <input
              onChange={(e) => handleImage(e)}
              accept="image/*"
              type="file"
              name=""
              className={styles.input}
            />
          </label>
        </div>
      </div>
    </Popup>
  );
};
