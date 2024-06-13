import classNames from 'classnames';
import type { FC } from 'react';
import type { Control } from 'react-hook-form';
import { useController } from 'react-hook-form';
import type { PairFilterForm } from '@entities/user';
import { createEmptyArray } from '@shared/helpers';
import { ListItem } from '@shared/ui';
import styles from '../../PairsFilterPopup.module.scss';

interface PicturesSettingProps {
  control: Control<PairFilterForm>;
}

export const PicturesSetting: FC<PicturesSettingProps> = ({ control }) => {
  const {
    field: { value: picturesCount, onChange: setPicturesCount },
  } = useController({ name: 'pictures', control });

  const picturesCountArrForLoop: undefined[] = createEmptyArray(9);

  return (
    <div className={styles.setting}>
      <div className={styles.name}>Min pictures count</div>
      <div className={classNames(styles.change, styles.flex)}>
        {picturesCountArrForLoop.map((_, i) => {
          const content = i + 1;
          return (
            <ListItem
              onClick={() => setPicturesCount(content)}
              isActive={picturesCount === content}
              key={i}
              pointer
            >
              {content}
            </ListItem>
          );
        })}
      </div>
    </div>
  );
};
