import type { FC } from 'react';
import type { Control } from 'react-hook-form';
import { useController } from 'react-hook-form';
import type { PairSorts } from '@entities/user/model';
import { createEmptyArray } from '@shared/helpers';
import { ListItem } from '@shared/ui';
import styles from '../PairsSortPopup.module.scss';

interface PhotosSettingProps {
  control: Control<PairSorts>;
}

export const PhotosSetting: FC<PhotosSettingProps> = ({ control }) => {
  const {
    field: { value: photosCount, onChange: setPhotosCount },
  } = useController({ name: 'photos', control });

  const photosCountArrForLoop: undefined[] = createEmptyArray(9);

  return (
    <div className={styles.setting}>
      <div className={styles.name}>Min photo's count</div>
      <div className={`${styles.change} ${styles.flex}`}>
        {photosCountArrForLoop.map((_, i) => {
          const content = i + 1;
          return (
            <ListItem
              onClick={() => setPhotosCount(content)}
              isActive={photosCount === content}
              key={i}
            >
              {content}
            </ListItem>
          );
        })}
      </div>
    </div>
  );
};
