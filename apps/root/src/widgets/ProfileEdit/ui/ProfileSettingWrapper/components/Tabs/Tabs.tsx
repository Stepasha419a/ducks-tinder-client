import { Button } from '@ducks-tinder-client/ui';
import classNames from 'classnames';
import type { FC } from 'react';
import styles from './Tabs.module.scss';

interface TabsProps {
  isPreviewTab: boolean;
  setIsPreviewTab: (value: boolean) => void;
}

export const Tabs: FC<TabsProps> = ({ isPreviewTab, setIsPreviewTab }) => {
  return (
    <div className={styles.btns}>
      <Button
        onClick={() => setIsPreviewTab(false)}
        extraClassName={classNames(
          !isPreviewTab && styles.active,
          styles.border
        )}
      >
        Change
      </Button>
      <Button
        onClick={() => setIsPreviewTab(true)}
        extraClassName={isPreviewTab ? styles.active : ''}
      >
        Preview
      </Button>
    </div>
  );
};
