import type { ChangeEvent, FC } from 'react';
import { Popup } from '@shared/ui';
import styles from './DialogUpload.module.scss';
import { createFileUrl } from '@/shared/lib/helpers';

interface DialogUploadProps {
  handleCloseDialogUpload: () => void;
  handleSubmit: (imageUrl: string) => void;
}

export const DialogUpload: FC<DialogUploadProps> = ({
  handleCloseDialogUpload,
  handleSubmit,
}) => {
  const handleImage = (e: ChangeEvent<HTMLInputElement>): void => {
    handleSubmit(createFileUrl(e.target.files![0]));
  };

  return (
    <Popup size="s" closeHandler={handleCloseDialogUpload}>
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
