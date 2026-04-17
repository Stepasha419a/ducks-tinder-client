import type { FC } from 'react';

import * as styles from './PreviewContent.module.scss';
import { useTranslation } from 'react-i18next';

interface PreviewContentProps {
  name: string;
  age: number | null;
  distance: number | null;
}

export const PreviewContent: FC<PreviewContentProps> = ({
  age,
  distance,
  name,
}) => {
  const { t } = useTranslation();

  return (
    <div className={styles.info}>
      <div className={styles.descr}>
        <div>{name}</div>
        <div className={styles.years}>{age}</div>
      </div>
      {distance !== null && (
        <div className={styles.distance}>
          {distance}
          <span className={styles.text}>{t('pairs.preview.distance')}</span>
        </div>
      )}
    </div>
  );
};
