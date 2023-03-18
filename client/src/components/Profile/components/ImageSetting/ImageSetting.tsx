import { useState } from 'react';
import { useAppSelector } from '../../../../hooks';
import { Preview } from '../../../Preview/Preview';
import { Button } from '../../../ui';
import { ImagesForm } from './ImagesForm/ImagesForm';
import styles from './ImageSetting.module.scss';

interface ImageSettingProps {
  setIsImageSetting: (isImageSetting: boolean) => void;
}

export const ImageSetting: React.FC<ImageSettingProps> = ({ setIsImageSetting }) => {
  const currentUser = useAppSelector((state) => state.usersPage.currentUser);

  const [isPreviewSetting, setIsPreviewSetting] = useState(false);
  const [isFullPreviewPageSetting, setIsFullPreviewPageSetting] =
    useState(false);

  return (
    <div className={styles.change}>
      {isFullPreviewPageSetting ? (
        <Preview
          user={currentUser}
          setIsFullPreview={setIsFullPreviewPageSetting}
          isFull
        />
      ) : (
        <>
          <div className={styles.btns}>
            <Button
              onClick={() => setIsPreviewSetting(false)}
              extraClassName={[
                !isPreviewSetting ? styles.active : '',
                styles.border,
              ]}
            >
              Change
            </Button>
            <Button
              onClick={() => setIsPreviewSetting(true)}
              extraClassName={isPreviewSetting ? styles.active : ''}
            >
              Preview
            </Button>
          </div>
          <div className={styles.panel}>
            {isPreviewSetting ? (
              <Preview
                user={currentUser}
                setIsFullPreview={setIsFullPreviewPageSetting}
              />
            ) : (
              <ImagesForm
                currentUser={currentUser}
                setIsImageSetting={setIsImageSetting}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};
