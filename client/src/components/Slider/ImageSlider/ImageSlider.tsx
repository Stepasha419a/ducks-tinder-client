import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import defaultUserPhoto from '../../../assets/images/photos/1.jpg';
import styles from './ImageSlider.module.scss';

interface ImageSliderPropsInterface {
  images: string[] | [];
  userId: string;
  imageExtraClassName?: string;
}

const ImageSlider: React.FC<ImageSliderPropsInterface> = ({
  images,
  userId,
  imageExtraClassName = '',
}) => {
  const [current, setCurrent] = useState(0);
  const length = images.length;
  const stripesArray = [];

  for (let i = 0; i <= length - 1; i++) {
    stripesArray.push(i);
  }

  const prevSlide = () => {
    setCurrent(current === 0 ? 0 : current - 1);
  };

  const nextSlide = () => {
    setCurrent(current === length - 1 ? length - 1 : current + 1);
  };

  if (!Array.isArray(images) || images.length <= 0 || images[0] === '') {
    return (
      <div className={styles.slider}>
        <div
          style={{ backgroundImage: `url(${defaultUserPhoto})` }}
          className={`${styles.item} ${styles.item_default} ${
            imageExtraClassName ? styles[`item${imageExtraClassName}`] : ''
          }`}
        ></div>
      </div>
    );
  }

  return (
    <div className={styles.slider}>
      <div className={styles.stripes}>
        {stripesArray.map((stripe) => {
          return (
            <div
              key={stripe}
              className={`${styles.stripe} ${
                stripe === current ? styles.stripe_active : ''
              }`}
            ></div>
          );
        })}
      </div>
      <div className={styles.arrows}>
        {current === 0 ? null : (
          <div onClick={prevSlide} className={styles.leftArrowWrapper}>
            <FontAwesomeIcon icon={faAngleLeft} className={styles.leftArrow} />
          </div>
        )}
        {current === length - 1 ? null : (
          <div onClick={nextSlide} className={styles.rigthArrowWrapper}>
            <FontAwesomeIcon
              icon={faAngleRight}
              className={styles.rightArrow}
            />
          </div>
        )}
      </div>

      {images.map((imageName, index) => {
        return (
          <div
            key={index}
            className={
              index === current
                ? styles.itemWrapper_active
                : styles.itemWrapper_hidden
            }
          >
            <div
              style={{
                backgroundImage: `url(http://localhost:5000/${userId}/${
                  index > 0 ? 'gallery' : 'avatar'
                }/${imageName})`,
              }}
              className={`${styles.item} ${
                imageExtraClassName ? styles[`item${imageExtraClassName}`] : ''
              }`}
            ></div>
          </div>
        );
      })}
    </div>
  );
};

export default ImageSlider;
