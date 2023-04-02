import classNames from 'classnames';
import { useState } from 'react';
import { PicturesEnum } from '../../shared/api/interfaces';
import { makeImageUrl } from '../../shared/helpers';
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
  const cnDefaultWrapper = classNames(styles.slider, extraWrapperClassName);
  const cn = classNames(styles.item, extraClassName);

  if (!Array.isArray(images) || images.length <= 0 || images[0] === '') {
    const url = makeImageUrl(userId);
    return (
      <div className={cnDefaultWrapper}>
        <img src={url} alt="imagesSlider" className={cnDefault}></img>
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
        const dir = index === 0 ? PicturesEnum.avatar : PicturesEnum.gallery;
        const url = makeImageUrl(userId, imageName, dir);
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
