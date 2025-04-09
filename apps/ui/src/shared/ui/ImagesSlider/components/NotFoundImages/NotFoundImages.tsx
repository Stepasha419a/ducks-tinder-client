import type { FC, ReactElement } from 'react';
import classNames from 'classnames';

import { makeImageUrl } from '@shared/lib';

import '../../override.scss';
import styles from '../../ImageSlider.module.scss';

interface NotFoundImagesProps {
  extraClassName: string | null;
  cnWrapper: string;
  content?: ReactElement;
}

export const NotFoundImages: FC<NotFoundImagesProps> = ({
  cnWrapper,
  extraClassName,
  content,
}) => {
  const cnDefault = classNames(styles.item, styles.default, extraClassName);
  const url = makeImageUrl();

  return (
    <div className={cnWrapper}>
      <div className="default-wrapper">
        <img src={url} alt="imagesSlider" className={cnDefault} />
        {content}
      </div>
    </div>
  );
};
