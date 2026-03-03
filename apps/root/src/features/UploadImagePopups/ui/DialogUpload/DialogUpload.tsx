import type { ChangeEvent, FC } from 'react';

import { createFileUrl } from '@ducks-tinder-client/common';
import { Popup } from '@ducks-tinder-client/ui';

import * as styles from './DialogUpload.module.scss';
import { toast } from 'react-toastify';

const MB_BYTES = 1_048_576;

const ALLOWED_MIME_TYPES = ['image/png', 'image/jpeg', 'image/jpg'];

interface DialogUploadProps {
  handleCloseDialogUpload: () => void;
  handleSubmit: (imageUrl: string) => void;
}

export const DialogUpload: FC<DialogUploadProps> = ({
  handleCloseDialogUpload,
  handleSubmit,
}) => {
  const handleImage = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files.length > 1) {
      toast('You can upload only 1 photo at once');

      return;
    }

    const file = e.target.files?.[0];
    if (!file) {
      toast('Photo not found');

      return;
    }

    if (file.size > MB_BYTES) {
      toast('Size should not be more than 1 MB');

      return;
    }

    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      toast('You can only upload photos of type png or jpg');

      return;
    }

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
              accept="image/png, image/jpeg, image/jpg"
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
