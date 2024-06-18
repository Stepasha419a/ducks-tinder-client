import classNames from 'classnames';
import type { FC } from 'react';
import { Button } from '@shared/ui';
import styles from './Tabs.module.scss';

interface TabsProps {
  isPreviewSetting: boolean;
  setIsPreviewSetting: (value: boolean) => void;
}

export const Tabs: FC<TabsProps> = ({
  isPreviewSetting,
  setIsPreviewSetting,
}) => {
  return (
    <div className={styles.btns}>
      <Button
        onClick={() => setIsPreviewSetting(false)}
        extraClassName={classNames(
          !isPreviewSetting && styles.active,
          styles.border
        )}
      >
        Change
      </Button>
      <Button
        onClick={() => setIsPreviewSetting(true)}
        extraClassName={isPreviewSetting ? styles.active : ''}
      >
        Preview
      </Button>
    </div>
  );
};
