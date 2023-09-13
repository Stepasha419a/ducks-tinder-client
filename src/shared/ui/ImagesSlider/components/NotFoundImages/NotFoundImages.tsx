import type { FC } from 'react';
import { makeImageUrl } from '@/shared/lib/helpers';
import classNames from 'classnames';
import styles from '../../ImageSlider.module.scss';
import '../../override.scss';

interface NotFoundImagesProps {
  userId: string;
  extraClassName: string | null;
  cnWrapper: string;
}

export const NotFoundImages: FC<NotFoundImagesProps> = ({
  userId,
  cnWrapper,
  extraClassName,
}) => {
  const cnDefault = classNames(styles.item, styles.default, extraClassName);
  const url = makeImageUrl(userId);

  return (
    <div className={cnWrapper}>
      <div className="default-wrapper">
        <img src={url} alt="imagesSlider" className={cnDefault} />
      </div>
    </div>
  );
};
