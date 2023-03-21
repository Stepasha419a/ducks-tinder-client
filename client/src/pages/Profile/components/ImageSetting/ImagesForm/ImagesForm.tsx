import { useState, FC, ChangeEvent } from 'react';
import { PicturesVariants, User } from '../../../../../models/User/User';
import { DialogUpload } from '../../popups';
import { CropImage } from '../../popups/CropImage/CropImage';
import { UserImages } from './UserImages/UserImages';
import styles from './ImagesForm.module.scss';
import { Button } from '../../../../../components/ui';

interface ImagesFormProps {
  currentUser: User;
  setIsImageSetting: (isImageSetting: boolean) => void;
}

export const ImagesForm: FC<ImagesFormProps> = ({
  currentUser,
  setIsImageSetting,
}) => {
  const [isImageCropOpen, setIsImageCropOpen] = useState(false);
  const [isDialogUploadOpen, setIsDialogUploadOpen] = useState(false);
  const [imageURL, setImageURL] = useState('');
  const [setting, setSetting] = useState<PicturesVariants | ''>('');

  const openSettingHandler = (setting: PicturesVariants) => {
    setSetting(setting);
    setIsDialogUploadOpen(true);
  };

  const onImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsDialogUploadOpen(false);
    const image = e.target.files![0];
    setImageURL(URL.createObjectURL(image));
    setIsImageCropOpen(true);
  };

  const submitHandler = () => {
    setIsImageSetting(false);
  };

  return (
    <div className={styles.change}>
      <UserImages
        currentUser={currentUser}
        openSettingHandler={openSettingHandler}
      />
      <div className={styles.descr}>
        Add more photos to fill out your profile
        <br />
        by another 4% and get more likes.
      </div>
      <div className={styles.save}>
        <Button
          onClick={() => submitHandler()}
          variant="gradient"
          extraClassName={styles.btn}
        >
          Save changes
        </Button>
      </div>

      {isDialogUploadOpen && (
        <DialogUpload
          onImageChange={onImageChange}
          setIsDialogUploadOpen={setIsDialogUploadOpen}
        />
      )}
      {isImageCropOpen && (
        <CropImage
          setIsImageCropOpen={setIsImageCropOpen}
          imageURL={imageURL}
          currentUser={currentUser}
          setting={setting}
          setSetting={setSetting}
        />
      )}
    </div>
  );
};
