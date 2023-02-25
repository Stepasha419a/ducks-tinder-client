import classNames from 'classnames';
import { useState } from 'react';
import defaultUserPhoto from '../../assets/images/photos/default.jpg';
import Arrows from './Arrows/Arrows';
import styles from './ImageSlider.module.scss';
import Stripes from './Stripes/Stripes';

interface ImageSliderPropsInterface {
  images: string[] | [];
  userId: string;
  extraClassName?: string;
  extraWrapperClassName?: string;
  arrowsExtraClassName?: string;
}

export const ImageSlider: React.FC<ImageSliderPropsInterface> = ({
  images,
  userId,
  extraClassName = '',
  extraWrapperClassName = '',
  arrowsExtraClassName = '',
}) => {
  const [current, setCurrent] = useState<number>(0);
  const length = images.length;

  const prevSlide = () => {
    setCurrent(current === 0 ? 0 : current - 1);
  };

  const nextSlide = () => {
    setCurrent(current === length - 1 ? length - 1 : current + 1);
  };

  const cnDefault = classNames(styles.item, styles.default, extraClassName);
  const cn = classNames(styles.item, extraClassName);

  if (!Array.isArray(images) || images.length <= 0 || images[0] === '') {
    return (
      <div className={styles.slider}>
        <img
          src={defaultUserPhoto}
          alt="imagesSlider"
          className={cnDefault}
        ></img>
      </div>
    );
  }

  return (
    <div className={styles.slider}>
      <Stripes current={current} length={length} />
      <Arrows
        current={current}
        length={length}
        prevSlide={prevSlide}
        nextSlide={nextSlide}
        arrowsExtraClassName={arrowsExtraClassName}
      />

      {images.map((imageName, index) => {
        const url = `http://localhost:5000/${userId}/${
          index > 0 ? 'gallery' : 'avatar'
        }/${imageName}`;
        const cnWrapper = classNames(
          styles.itemWrapper,
          index === current ? styles.active : styles.hidden,
          extraWrapperClassName
        );

        return (
          <div key={index} className={cnWrapper}>
            <img src={url} alt="imagesSlider" className={cn}></img>
          </div>
        );
      })}
    </div>
  );
};
