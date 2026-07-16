import { useState } from 'react';
import Cropper from 'react-easy-crop';

import {
  addModal,
  Button,
  Popup,
  RangeInput,
  useModalProps,
} from '@ducks-tinder-client/ui';

import type { PixelCrop, ReturnGetCroppedImg } from './cropImageScript';
import getCroppedImg from './cropImageScript';
import * as styles from './CropImage.module.scss';
import { useTranslation } from 'react-i18next';

export interface CropImageProps {
  imageUrl: string;
}

export type CropImageResult = Blob | null;

export const CropImage = () => {
  const { resolveModal, props } = useModalProps<CropImageProps>(CropImage);
  const { imageUrl } = props;

  const { t } = useTranslation();

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<PixelCrop | null>(
    null
  );

  const cropComplete = (
    _croppedArea: PixelCrop,
    croppedPixels: PixelCrop
  ): void => {
    setCroppedAreaPixels(croppedPixels);
  };

  const submitHandler = async (): Promise<void> => {
    const croppedImageData: ReturnGetCroppedImg | null = await getCroppedImg(
      imageUrl,
      croppedAreaPixels!
    );
    resolveModal<CropImageResult>(croppedImageData!.picture);
  };

  return (
    <Popup
      size="l"
      title={t('profile.settings.photo.gallery')}
      closeHandler={() => resolveModal(null)}
    >
      <div className={styles.container}>
        <Cropper
          image={imageUrl}
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
            onClick={() => resolveModal(null)}
            extraClassName={styles.btn}
          >
            {t('cancel')}
          </Button>
          <Button
            onClick={submitHandler}
            extraClassName={[styles.btn, styles.select]}
          >
            {t('select')}
          </Button>
        </div>
      </div>
    </Popup>
  );
};

addModal(CropImage, 'CropImage');
