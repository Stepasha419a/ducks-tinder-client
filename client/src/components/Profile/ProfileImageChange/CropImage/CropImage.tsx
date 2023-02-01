import { useState } from 'react';
import Cropper from 'react-easy-crop';
import { IUser } from '../../../../models/IUser';
import { saveUserImage } from '../../../../redux/usersReducer';
import {
  RangeInput,
} from '../../../ui/inputs/Range/RangeInput';
import getCroppedImg from './cropImageScript.js';
import styles from './CropImage.module.scss';
import { useAppDispatch } from '../../../../redux/reduxStore';
import { RangeInterface } from '../../../ui/inputs/Range/RangeInput.types';

interface ProfileCropImagePropsInterface {
  currentUser: IUser;
  setIsImageCropOpen: (setting: boolean) => void;
  imageURL: any;
  currentImageCrop: 'avatar' | 'gallery' | '';
  setCurrentImageCrop: (setting: 'avatar' | 'gallery' | '') => void;
}

const ProfileCropImage: React.FC<ProfileCropImagePropsInterface> = ({
  setIsImageCropOpen,
  imageURL,
  currentUser,
  currentImageCrop,
  setCurrentImageCrop,
}) => {
  const dispatch = useAppDispatch();
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const cropComplete = (croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const cropImage = async (
    userId: string,
    setting: 'avatar' | 'gallery' | ''
  ) => {
    try {
      const { picture }: any = await getCroppedImg(
        imageURL,
        croppedAreaPixels,
        rotation
      );
      setting && dispatch(saveUserImage({ picture, userId, setting }));
      setIsImageCropOpen(false);
      setCurrentImageCrop('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.popup}>
      <div className={styles.body}>
        <div className={styles.content}>
          <div className={styles.title}>Redact photo</div>
          <div className={styles.image}>
            <Cropper
              image={imageURL}
              crop={crop}
              zoom={zoom}
              rotation={rotation}
              aspect={3 / 4}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onRotationChange={setRotation}
              onCropComplete={cropComplete}
            />
          </div>
          <div className={styles.wrapper}>
            <div className={styles.input}>
              <RangeInput
                value={zoom}
                setValue={(value: number | RangeInterface) =>
                  setZoom(value as number)
                }
                completeValue={() => {}}
                min={1.1}
                max={3}
                step={0.01}
              />
            </div>
          </div>
          <div className={styles.btns}>
            <button
              onClick={() => setIsImageCropOpen(false)}
              className={styles.btn}
            >
              Cancel
            </button>
            <button
              onClick={() => cropImage(currentUser._id, currentImageCrop)}
              className={`${styles.btn} ${styles.btn_select}`}
            >
              Select
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCropImage;
