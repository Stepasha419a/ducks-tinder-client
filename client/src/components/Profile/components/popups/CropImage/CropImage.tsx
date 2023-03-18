import { FC, useState } from 'react';
import Cropper from 'react-easy-crop';
import { User } from '../../../../../models/User/User';
import { Button, Popup, RangeInput } from '../../../../ui';
import getCroppedImg, { PixelCrop } from './cropImageScript';
import styles from './CropImage.module.scss';
import { saveUserImage } from '../../../../../redux/users/users.thunks';
import { useAppDispatch } from '../../../../../hooks';

interface CropImageProps {
  currentUser: User;
  setIsImageCropOpen: (setting: boolean) => void;
  imageURL: any;
  currentImageCrop: 'avatar' | 'gallery' | '';
  setCurrentImageCrop: (setting: 'avatar' | 'gallery' | '') => void;
}

export const CropImage: FC<CropImageProps> = ({
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
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<PixelCrop | null>(
    null
  );

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
        croppedAreaPixels!,
        rotation
      );
      setting && dispatch(saveUserImage({ picture, userId, setting } as any));
      setIsImageCropOpen(false);
      setCurrentImageCrop('');
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
              value={{ value: zoom }}
              setValue={(value) => setZoom(value.value!)}
              min={1.1}
              max={3}
              step={0.01}
            />
          </div>
        </div>
        <div className={styles.btns}>
          <Button
            onClick={() => setIsImageCropOpen(false)}
            extraClassName={styles.btn}
          >
            Cancel
          </Button>
          <Button
            onClick={() => cropImage(currentUser._id, currentImageCrop)}
            extraClassName={[styles.btn, styles.select]}
          >
            Select
          </Button>
        </div>
      </div>
    </Popup>
  );
};
