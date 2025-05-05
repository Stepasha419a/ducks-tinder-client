import type { FC } from 'react';
import type { Control } from 'react-hook-form';
import { useController } from 'react-hook-form';
import classNames from 'classnames';

import { createEmptyArray } from '@ducks-tinder-client/common';
import { ListItemButton } from '@ducks-tinder-client/ui';

import type { PairFilterForm } from '@entities/user';

import styles from '../../PairsFilterPopup.module.scss';

interface PicturesSettingProps {
  control: Control<PairFilterForm>;
}

export const PicturesSetting: FC<PicturesSettingProps> = ({ control }) => {
  const {
    field: { value: picturesCount, onChange: setPicturesCount },
  } = useController({ name: 'pictures', control });

  const picturesCountArrForLoop: undefined[] = createEmptyArray(10);

  return (
    <div className={styles.setting}>
      <div className={styles.name}>Min pictures count</div>
      <div className={classNames(styles.change, styles.flex)}>
        {picturesCountArrForLoop.map((_, i) => {
          return (
            <ListItemButton
              onClick={() => setPicturesCount(i)}
              isActive={picturesCount === i}
              key={i}
              type="button"
            >
              {i}
            </ListItemButton>
          );
        })}
      </div>
    </div>
  );
};
