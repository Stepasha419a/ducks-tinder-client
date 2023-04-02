import { FC, useState } from 'react';
import Cropper from 'react-easy-crop';
import { PicturesVariants, User } from '../../../../../shared/api/interfaces';
import getCroppedImg, {
  PixelCrop,
  ReturnGetCroppedImg,
} from './cropImageScript';
import styles from './CropImage.module.scss';
import { saveUserImage } from '../../../../../redux/users/users.thunks';
import { useAppDispatch } from '../../../../../hooks';
import { Button, Popup, RangeInput } from '../../../../../shared/ui';

interface CropImageProps {
  currentUser: User;
  setIsImageCropOpen: (setting: boolean) => void;
  imageURL: string;
  setting: PicturesVariants | '';
  setSetting: (setting: PicturesVariants | '') => void;
}

export const CropImage: FC<CropImageProps> = ({
  setIsImageCropOpen,
  imageURL,
  currentUser,
  setting,
  setSetting,
}) => {
  const dispatch = useAppDispatch();
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<PixelCrop | null>(
    null
  );

  const cropComplete = (
    croppedArea: PixelCrop,
    croppedAreaPixels: PixelCrop
  ) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const cropImage = async (userId: string, setting: PicturesVariants | '') => {
    try {
      const croppedImageData: ReturnGetCroppedImg | null = await getCroppedImg(
        imageURL,
        croppedAreaPixels!,
        rotation
      );
      setting &&
        dispatch(
          saveUserImage({
            picture: croppedImageData!.picture,
            userId,
            setting,
          })
        );
      setIsImageCropOpen(false);
      setSetting('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Popup
      size="l"
      title="Redact photo"
      closeHandler={() => setIsImageCropOpen(false)}
    >
      <div className={styles.container}>
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
          classes={{ containerClassName: styles.cropper }}
        />
        <div className={styles.wrapper}>
          <RangeInput
            value={{ value: zoom }}
            setValue={(value) => setZoom(value.value!)}
            min={1.1}
            max={3}
            step={0.01}
          />
        </div>
        <div className={styles.btns}>
          <Button
            onClick={() => setIsImageCropOpen(false)}
            extraClassName={styles.btn}
          >
            Cancel
          </Button>
          <Button
            onClick={() => cropImage(currentUser._id, setting)}
            extraClassName={[styles.btn, styles.select]}
          >
            Select
          </Button>
        </div>
      </div>
    </Popup>
  );
};
