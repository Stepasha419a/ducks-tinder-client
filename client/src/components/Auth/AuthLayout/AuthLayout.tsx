import styles from './AuthLayout.module.scss';
import { FC, PropsWithChildren, useEffect, ReactNode } from 'react';
import authImg from '../../../assets/images/auth/img-01.png';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../hooks';
import { AuthFieldValues } from '../hooks/useAuthForm';
import { FieldErrors } from 'react-hook-form';

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
  const isAuth = useAppSelector((state) => state.authPage.isAuth);

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
              {Object.values(errors).map((error) => (
                <div className={styles.error}>{error.message!.toString()}</div>
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
