import type { FC } from 'react';
import classNames from 'classnames';

import { Button } from '@ducks-tinder-client/ui';

import * as styles from './Tabs.module.scss';
import { useTranslation } from 'react-i18next';

interface TabsProps {
  isPreviewTab: boolean;
  setIsPreviewTab: (value: boolean) => void;
}

export const Tabs: FC<TabsProps> = ({ isPreviewTab, setIsPreviewTab }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.btns}>
      <Button
        onClick={() => setIsPreviewTab(false)}
        extraClassName={classNames(
          !isPreviewTab && styles.active,
          styles.border
        )}
      >
        {t('change')}
      </Button>
      <Button
        onClick={() => setIsPreviewTab(true)}
        extraClassName={isPreviewTab ? styles.active : ''}
      >
        {t('preview')}
      </Button>
    </div>
  );
};
