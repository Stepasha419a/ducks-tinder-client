import type { FC } from 'react';
import { useState } from 'react';
import Cropper from 'react-easy-crop';
import {
  saveUserImageThunk,
  selectCropImage,
  setIsImageCropOpen,
} from '@/entities/user/model/user';
import { useAppDispatch, useAppSelector } from '@shared/lib/hooks';
import { Button, Popup, RangeInput } from '@shared/ui';
import type { PixelCrop, ReturnGetCroppedImg } from './cropImageScript';
import getCroppedImg from './cropImageScript';
import styles from './CropImage.module.scss';

export const CropImage: FC = () => {
  const dispatch = useAppDispatch();

  const { imageURL } = useAppSelector(selectCropImage);

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<PixelCrop | null>(
    null
  );

  const cropComplete = (
    croppedArea: PixelCrop,
    croppedPixels: PixelCrop
  ): void => {
    setCroppedAreaPixels(croppedPixels);
  };

  const submitHandler = async (): Promise<void> => {
    const croppedImageData: ReturnGetCroppedImg | null = await getCroppedImg(
      imageURL!,
      croppedAreaPixels!
    );
    dispatch(saveUserImageThunk(croppedImageData!.picture));
  };

  return (
    <Popup
      size="l"
      title="Redact photo"
      closeHandler={() => dispatch(setIsImageCropOpen(false))}
    >
      <div className={styles.container}>
        <Cropper
          image={imageURL!}
          crop={crop}
          zoom={zoom}
          aspect={3 / 4}
          onCropChange={setCrop}
          onZoomChange={setZoom}
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
            onClick={() => dispatch(setIsImageCropOpen(false))}
            extraClassName={styles.btn}
          >
            Cancel
          </Button>
          <Button
            onClick={submitHandler}
            extraClassName={[styles.btn, styles.select]}
          >
            Select
          </Button>
        </div>
      </div>
    </Popup>
  );
};
