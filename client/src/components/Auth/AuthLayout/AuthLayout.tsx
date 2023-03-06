import styles from './AuthLayout.module.scss';
import { FC, PropsWithChildren, useEffect } from 'react';
import authImg from '../../../assets/images/auth/img-01.png';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../hooks';

const AuthLayout: FC<PropsWithChildren<{}>> = ({ children }) => {
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
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
