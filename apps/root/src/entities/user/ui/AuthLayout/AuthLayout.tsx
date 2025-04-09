import type { FC, PropsWithChildren, ReactNode } from 'react';
import type { FieldErrors } from 'react-hook-form';

import type { RegistrationParams } from '@ducks-tinder-client/common';
import { authDuck } from '@ducks-tinder-client/ui';

import styles from './AuthLayout.module.scss';

interface AuthLayoutProps {
  errors: FieldErrors<RegistrationParams>;
  title: string;
  link: ReactNode;
}

export const AuthLayout: FC<PropsWithChildren<AuthLayoutProps>> = ({
  errors,
  title,
  children,
  link,
}) => {
  return (
    <div className={styles.auth}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <img
            className={styles.img}
            draggable={false}
            src={authDuck}
            alt="IMG"
          />
          <div className={styles.formWrapper}>
            <span className={styles.title}>{title}</span>
            <div className={styles.validation}>
              {Object.values(errors).map((error, i) => (
                <div key={i} className={styles.error}>
                  {error.message?.toString()}
                </div>
              ))}
            </div>
            {children}
            <div className={styles.navigate}>{link}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
