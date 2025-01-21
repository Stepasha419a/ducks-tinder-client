import { Button, Popup, RangeInput } from '@ducks-tinder-client/ui';
import type { FC } from 'react';
import { useState } from 'react';
import Cropper from 'react-easy-crop';
import styles from './CropImage.module.scss';
import type { PixelCrop, ReturnGetCroppedImg } from './cropImageScript';
import getCroppedImg from './cropImageScript';

interface CropImageProps {
  imageUrl: string | null;
  handleCloseImageCrop: () => void;
  handleSubmit: (picture: Blob) => void;
}

export const CropImage: FC<CropImageProps> = ({
  imageUrl,
  handleCloseImageCrop,
  handleSubmit,
}) => {
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
      imageUrl!,
      croppedAreaPixels!
    );
    handleSubmit(croppedImageData!.picture);
  };

  return (
    <Popup size="l" title="Redact photo" closeHandler={handleCloseImageCrop}>
      <div className={styles.container}>
        <Cropper
          image={imageUrl!}
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
          <Button onClick={handleCloseImageCrop} extraClassName={styles.btn}>
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
