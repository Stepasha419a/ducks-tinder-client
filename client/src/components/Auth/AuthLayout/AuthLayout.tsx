import type { FC, PropsWithChildren, ReactNode } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { FieldErrors } from 'react-hook-form';
import { useAppSelector } from '@hooks';
import authImg from '@images/auth-duck.png';
import type { AuthFieldValues } from '../hooks/useAuthForm';
import styles from './AuthLayout.module.scss';

interface AuthLayoutProps {
  errors: FieldErrors<AuthFieldValues>;
  title: string;
  link: ReactNode;
}

const AuthLayout: FC<PropsWithChildren<AuthLayoutProps>> = ({
  errors,
  title,
  children,
  link,
}) => {
  const navigate = useNavigate();
  const isAuth = useAppSelector((state) => state.auth.isAuth);

  useEffect(() => {
    if (isAuth) {
      navigate('/');
    }
  }, [isAuth, navigate]);

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

export default AuthLayout;
