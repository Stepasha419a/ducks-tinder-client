import type { FC, RefObject } from 'react';
import { useState } from 'react';
import classNames from 'classnames';
import type Slider from 'react-slick';
import Carousel from 'react-slick';
import type { Picture } from '@shared/api/interfaces';
import {
  NotFoundImages,
  DotsWrapper,
  NextArrow,
  PrevArrow,
  Dot,
} from './components';
import styles from './ImageSlider.module.scss';
import 'slick-carousel/slick/slick.scss';
import './override.scss';
import { makeImageUrl, showDefaultImage } from '@/shared/lib/helpers';

interface ImageSliderProps {
  images: Picture[];
  userId: string;
  extraClassName?: string;
  isShadow?: boolean;
  sliderRef?: RefObject<Slider>;
}

export const ImageSlider: FC<ImageSliderProps> = ({
  images,
  userId,
  extraClassName = null,
  isShadow,
  sliderRef,
}) => {
  const [current, setCurrent] = useState<number>(0);

  const cn = classNames(styles.item, extraClassName);
  const cnWrapper = classNames(
    styles.slider,
    isShadow ? 'isShadow' : 'smallArrowWrappers',
    'slider'
  );

  if (!Array.isArray(images) || images.length <= 0) {
    return <NotFoundImages
      cnWrapper={cnWrapper}
      extraClassName={extraClassName}
      userId={userId}
    />;
  }

  const isFirstImage = current === 0;
  const isLastImage = current === images.length - 1;

  return (
    <div className={cnWrapper}>
      <Carousel
        ref={sliderRef}
        speed={500}
        dots={true}
        arrows={true}
        infinite={false}
        prevArrow={isFirstImage ? <></> : <PrevArrow />}
        nextArrow={isLastImage ? <></> : <NextArrow />}
        afterChange={(i: number) => setCurrent(i)}
        customPaging={(i) => <Dot isActive={i === current} />}
        appendDots={(dots) => <DotsWrapper>{dots}</DotsWrapper>}
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
