import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../../../hooks';
import { ImageInterface, User } from '../../../../models/User';
import {
  deleteUserImage,
  mixUserImages,
} from '../../../../redux/users/users.thunks';
import { Button } from '../../../ui';
import ProfileCropImage from '../CropImage/CropImage';
import ProfileDialogUpload from '../CropImage/DialogUpload/DialogUpload';
import styles from './ChangeImage.module.scss';

interface ProfileChangeImagePropsInterface {
  currentUser: User;
  setIsImageSetting: (isImageSetting: boolean) => void;
}

const ProfileChangeImage: React.FC<ProfileChangeImagePropsInterface> = ({
  currentUser,
  setIsImageSetting,
}) => {
  const dispatch = useAppDispatch();

  const [isImageCropOpen, setIsImageCropOpen] = useState(false);
  const [isDialogUploadOpen, setIsDialogUploadOpen] = useState(false);
  const [imageURL, setImageURL] = useState({});
  const [currentImageCrop, setCurrentImageCrop] = useState(
    '' as 'avatar' | 'gallery' | ''
  );

  const [images, setImages] = useState<ImageInterface[]>([]);
  const [currentImage, setCurrentImage] = useState<ImageInterface | null>(null);

  const [imagesChanged, setImagesChanged] = useState(false);

  useEffect(() => {
    currentUser.pictures.avatar &&
      setImages([
        {
          id: 0,
          order: 0,
          image: currentUser.pictures.avatar,
          setting: 'avatar',
        },
        ...currentUser.pictures.gallery.map((image, index) => {
          return {
            id: index + 1,
            order: index + 1,
            image: image,
            setting: 'gallery',
          };
        }),
      ]);

    !currentUser.pictures.avatar &&
      setImages([
        '' as any,
        ...currentUser.pictures.gallery.map((image, index) => {
          return {
            id: index + 1,
            order: index + 1,
            image: image,
            setting: 'gallery',
          };
        }),
      ]);
  }, [currentUser.pictures.avatar, currentUser.pictures.gallery]);

  useEffect(() => {
    imagesChanged && dispatch(mixUserImages({ currentUser, images }));
    setImagesChanged(false);
  }, [imagesChanged, dispatch, currentUser, images]);

  const openSettingHandler = (setting: 'avatar' | 'gallery' | '') => {
    setCurrentImageCrop(setting);
    setIsDialogUploadOpen(true);
  };

  const deleteImageHandler = (
    pictureName: string,
    userId: string,
    setting: 'avatar' | 'gallery'
  ) => {
    dispatch(deleteUserImage({ pictureName, userId, setting }));
  };

  const onImageChange = (e: any) => {
    setIsDialogUploadOpen(false);
    const [image] = e.target.files;
    setImageURL(URL.createObjectURL(image));
    setIsImageCropOpen(true);
  };

  let arrForLoop = [];
  for (let i = 0; i < 9 - currentUser.pictures.gallery.length - 1; i++) {
    arrForLoop.push(i);
  }

  const submitHandler = () => {
    setIsImageSetting(false);
  };

  const dragStartHangler = (e: any, card: ImageInterface) => {
    setCurrentImage(card);
  };

  const dragEndHangler = (e: any, card: string, setting: string) => {
    e.target.style.backgroundImage = `url(http://localhost:5000/${currentUser._id}/${setting}/${card})`;
    e.target.style.backgroundPosition = '50% 79.5455%';
    e.target.style.backgroundSize = 'auto 100%';
    e.target.style.backgroundRepeat = 'no-repeat';
    e.target.style.opacity = '1';
  };

  const dragOverHangler = (e: any) => {
    e.preventDefault();
    e.target.style.opacity = '0.5';
  };

  const dropHangler = (e: any, card: ImageInterface) => {
    e.preventDefault();
    setImages(
      images.map((image, index) => {
        if (index === images.length - 1) {
          setImagesChanged(true);
        }
        if (image.id === card.id) {
          return { ...image, order: currentImage!.order };
        }

        if (image.id === currentImage!.id) {
          return { ...image, order: card.order };
        }
        return image;
      })
    );
    e.target.style.opacity = '1';
  };

  const sortCards = (a: ImageInterface, b: ImageInterface) => a.order - b.order;

  return (
    <div className={styles.change}>
      <div className={styles.images}>
        {images.sort(sortCards).map((imageObj, index) => {
          if (!imageObj) {
            return (
              <div
                onClick={() =>
                  index === 0
                    ? openSettingHandler('avatar')
                    : openSettingHandler('gallery')
                }
                key={index}
                className={styles.item}
              >
                <div className={styles.image} />
                <Button
                  variant="mark"
                  extraClassName={[styles.btn, styles.plus]}
                >
                  <FontAwesomeIcon className={styles.mark} icon={faPlus} />
                </Button>
              </div>
            );
          }
          return (
            <div key={index} className={styles.item}>
              <div
                draggable
                onDragStart={(e) => dragStartHangler(e, imageObj)}
                onDragLeave={(e) =>
                  dragEndHangler(e, imageObj.image, imageObj.setting)
                }
                onDragEnd={(e) =>
                  dragEndHangler(e, imageObj.image, imageObj.setting)
                }
                onDragOver={(e) => dragOverHangler(e)}
                onDrop={(e) => dropHangler(e, imageObj)}
                style={{
                  backgroundImage: `url(http://localhost:5000/${currentUser._id}/${imageObj.setting}/${imageObj.image})`,
                }}
                className={`${styles.image} ${styles.image_has_image}`}
              />
              <Button
                variant="mark"
                onClick={() =>
                  deleteImageHandler(
                    imageObj.image,
                    currentUser._id,
                    imageObj.setting as 'avatar' | 'gallery'
                  )
                }
                extraClassName={[styles.btn, styles.xmark]}
              >
                <FontAwesomeIcon className={styles.mark} icon={faXmark} />
              </Button>
            </div>
          );
        })}

        {arrForLoop.map((item) => {
          return (
            <div
              onClick={() => openSettingHandler('gallery')}
              key={item}
              className={styles.item}
            >
              <div className={styles.image} />
              <Button variant="mark" extraClassName={[styles.btn, styles.plus]}>
                <FontAwesomeIcon className={styles.mark} icon={faPlus} />
              </Button>
            </div>
          );
        })}
      </div>
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
        <ProfileDialogUpload
          onImageChange={onImageChange}
          setIsDialogUploadOpen={setIsDialogUploadOpen}
        />
      )}

      {isImageCropOpen && (
        <ProfileCropImage
          setIsImageCropOpen={setIsImageCropOpen}
          imageURL={imageURL}
          currentUser={currentUser}
          currentImageCrop={currentImageCrop}
          setCurrentImageCrop={setCurrentImageCrop}
        />
      )}
    </div>
  );
};

export default ProfileChangeImage;
