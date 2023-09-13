import type { FC, PropsWithChildren, ReactNode } from 'react';
import type { FieldErrors } from 'react-hook-form';
import type { AuthFieldValues } from '@entities/auth/lib/hooks/useAuthForm';
import authImg from '@shared/assets/images/auth-duck.png';
import styles from './AuthLayout.module.scss';

interface AuthLayoutProps {
  errors: FieldErrors<AuthFieldValues>;
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
            src={authImg}
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
