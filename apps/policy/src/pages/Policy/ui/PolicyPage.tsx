import type { FC, ReactElement } from 'react';
import { Link } from 'react-router-dom';

import { authDuck } from '@ducks-tinder-client/ui';

import * as styles from './PolicyPage.module.scss';
import { useTranslation } from 'react-i18next';

const PolicyPage: FC = (): ReactElement => {
  const { t } = useTranslation('policy');

  return (
    <div className={styles.policy}>
      <header className={styles.header}>
        <div className={styles.container}>
          <Link to="/" className={styles.link}>
            <img src={authDuck} alt="IMG" className={styles.image} />
            <span className={styles.text}>{t('page_title')}</span>
          </Link>
        </div>
      </header>
      <hr className={styles.hr} />
      <div className={styles.content}>
        <div className={styles.container}>
          <h1 className={styles.title}>{t('paragraph_title')}</h1>
          <p className={styles.text}>{t('paragraph_text')}</p>
        </div>
      </div>
    </div>
  );
};

export default PolicyPage;
