import { Popup } from '../../../../../ui';
import styles from './DialogUpload.module.scss';

interface ProfileDialogUploadPropsInterface {
  onImageChange: (e: any) => void;
  setIsDialogUploadOpen: (setting: boolean) => void;
}

const ProfileDialogUpload: React.FC<ProfileDialogUploadPropsInterface> = ({
  onImageChange,
  setIsDialogUploadOpen,
}) => {
  return (
    <Popup size="s" closeHandler={() => setIsDialogUploadOpen(false)}>
      <div className={styles.title}>Upload</div>
      <div className={styles.descr}>Choose context type</div>
      <div className={styles.wrapper}>
        <div className={styles.input}>
          <label htmlFor="upload__input-gallery" className={styles.label}>
            <span className={styles.span}>
              Upload from
              <br />
              <span className={styles.boldSpan}>Gallery</span>
            </span>
            <input
              onChange={(e) => onImageChange(e)}
              accept="image/*"
              type="file"
              name=""
              id="upload__input-gallery"
              className={styles.input}
            />
          </label>
        </div>
      </div>
    </Popup>
  );
};

export default ProfileDialogUpload;
