import type { ChangeEvent } from 'react';

import { createFileUrl } from '@ducks-tinder-client/common';
import { addModal, Popup, useModalProps } from '@ducks-tinder-client/ui';

import * as styles from './DialogUpload.module.scss';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const MB_BYTES = 1_048_576;

const ALLOWED_MIME_TYPES = ['image/png', 'image/jpeg', 'image/jpg'];

export type DialogUploadResult = string | null;

export const DialogUpload = () => {
  const { resolveModal } = useModalProps(DialogUpload);
  const { t } = useTranslation();

  const handleImage = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files.length > 1) {
      toast(t('profile.settings.photo.onlyOnePhoto'));

      return;
    }

    const file = e.target.files?.[0];
    if (!file) {
      toast(t('profile.settings.photo.notFound'));

      return;
    }

    if (file.size > MB_BYTES) {
      toast(t('profile.settings.photo.sizeLimit'));

      return;
    }

    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      toast(t('profile.settings.photo.extension'));

      return;
    }

    resolveModal<DialogUploadResult>(createFileUrl(e.target.files![0]));
  };

  return (
    <Popup size="s" closeHandler={() => resolveModal(null)}>
      <div className={styles.title}>{t('profile.settings.photo.upload')}</div>
      <div className={styles.descr}>
        {t('profile.settings.photo.chooseContext')}
      </div>
      <div className={styles.wrapper}>
        <div className={styles.input}>
          <label className={styles.label}>
            <span className={styles.span}>
              {t('profile.settings.photo.uploadFrom')}
              <br />
              <span className={styles.boldSpan}>
                {t('profile.settings.photo.gallery')}
              </span>
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

addModal(DialogUpload, 'DialogUpload');
