import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faGear, faPen } from '@fortawesome/free-solid-svg-icons';
import { CropImage, DialogUpload } from '@features/user';
import { useAppDispatch, useAppSelector } from '@shared/lib/hooks';
import { Avatar } from '@shared/ui';
import { ROUTES } from '@shared/constants';
import { selectPreviewUser, setIsDialogUploadOpen } from '@entities/user/model';
import styles from './ProfilePreview.mobile.module.scss';

export const ProfilePreviewMobile = () => {
  const dispatch = useAppDispatch();

  const previewUser = useAppSelector(selectPreviewUser);
  const isDialogUploadOpen = useAppSelector(
    (state) => state.user.profileSetting.isDialogUploadOpen
  );
  const isImageCropOpen = useAppSelector(
    (state) => state.user.profileSetting.isImageCropOpen
  );

  const openSettingHandler = (): void => {
    dispatch(setIsDialogUploadOpen(true));
  };

  return (
    <>
      <div className={styles.profile}>
        <div className={styles.miniature}>
          <div className={styles.wrapper}>
            <Link to={`${ROUTES.profile}/edit`} className={styles.user}>
              <div className={styles.avatarWrapper}>
                <Avatar
                  userId={previewUser.id}
                  avatarUrl={previewUser.pictures[0]?.name}
                  size="xl"
                  extraClassName={styles.avatar}
                />
              </div>
              <div className={styles.descr}>
                <div className={styles.name}>{previewUser.name}</div>
                <div className={styles.age}>{previewUser.age}</div>
              </div>
            </Link>
            <div className={styles.actions}>
              <Link
                to={ROUTES.settings}
                className={classNames(styles.action, styles.top)}
              >
                <div className={styles.iconWrapper}>
                  <FontAwesomeIcon className={styles.icon} icon={faGear} />
                </div>
                Settings
              </Link>
              <Link to={`${ROUTES.profile}/edit`} className={styles.action}>
                <div className={styles.iconWrapper}>
                  <FontAwesomeIcon className={styles.icon} icon={faPen} />
                </div>
                Change profile
              </Link>
              <div
                onClick={openSettingHandler}
                className={classNames(
                  styles.action,
                  styles.top,
                  styles.pointer
                )}
              >
                <div className={styles.iconWrapper}>
                  <FontAwesomeIcon className={styles.icon} icon={faCamera} />
                </div>
                Add photos
              </div>
            </div>
          </div>
        </div>
        <div className={styles.membership}>membership</div>
      </div>
      {isDialogUploadOpen && <DialogUpload />}
      {isImageCropOpen && <CropImage />}
    </>
  );
};
