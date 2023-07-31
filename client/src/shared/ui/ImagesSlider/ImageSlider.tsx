import type { FC } from 'react';
import { useState } from 'react';
import classNames from 'classnames';
import Carousel from 'react-slick';
import { makeImageUrl, showDefaultImage } from '@shared/helpers';
import type { Picture } from '@shared/api/interfaces';
import styles from './ImageSlider.module.scss';
import 'slick-carousel/slick/slick.scss';
import './override.scss';
import { Dots, NextArrow, PrevArrow } from './components';

interface ImageSliderPropsInterface {
  images: Picture[];
  userId: string;
  extraClassName?: string;
  isShadow?: boolean;
}

export const ImageSlider: FC<ImageSliderPropsInterface> = ({
  images,
  userId,
  extraClassName = null,
  isShadow,
}) => {
  const [current, setCurrent] = useState<number>(0);

  const cnWrapper = classNames(
    styles.slider,
    isShadow ? 'isShadow' : 'smallArrowWrappers',
    'slider'
  );
  const cn = classNames(styles.item, extraClassName);

  if (!Array.isArray(images) || images.length <= 0) {
    const cnDefault = classNames(styles.item, styles.default, extraClassName);
    const url = makeImageUrl(userId);
    return (
      <div className={cnWrapper}>
        <img src={url} alt="imagesSlider" className={cnDefault}></img>
      </div>
    );
  }

  const isFirstImage = current === 0;
  const isLastImage = current === images.length - 1;

  return (
    <div className={cnWrapper}>
      <Carousel
        speed={500}
        dots={true}
        arrows={true}
        infinite={false}
        prevArrow={isFirstImage ? <></> : <PrevArrow />}
        nextArrow={isLastImage ? <></> : <NextArrow />}
        afterChange={(i: number) => setCurrent(i)}
        customPaging={(i) => (
          <div className={styles.wrapper}>
            <div
              className={classNames(styles.dot, i === current && styles.active)}
            />
          </div>
        )}
        appendDots={(dots) => <Dots>{dots}</Dots>}
        className={styles.carousel}
      >
        {images.map((image, index) => {
          return (
            <div key={index}>
              <img
                src={makeImageUrl(userId, image.name)}
                alt="imagesSlider"
                onError={showDefaultImage}
                className={cn}
              ></img>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};
