import type { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import headerImg from '@images/auth-duck.png';
import styles from './Policy.module.scss';

export const Policy = (): ReactElement => {
  return (
    <div className={styles.policy}>
      <header className={styles.header}>
        <div className={styles.container}>
          <Link to="/" className={styles.link}>
            <img src={headerImg} alt="IMG" className={styles.image} />
            <span className={styles.text}>ducks tinder</span>
          </Link>
        </div>
      </header>
      <hr className={styles.hr} />
      <div className={styles.content}>
        <div className={styles.container}>
          <h1 className={styles.title}>Community Rules</h1>
          <p className={styles.text}>
            Welcome to the Ducks Tinder community. If you are honest, kind and
            respectful towards others, we will always be glad to see you here.
            However, if you behave differently, unfortunately, we will be forced
            to part with you. Our goal is for users to be able to express
            themselves freely as long as it doesn't hurt the feelings of others.
            There is a single standard of behavior for everyone on Tinder. We
            ask you to treat others with respect, think carefully about your
            actions and follow the rules of our community both online and
            offline. That's right: your offline behavior may lead to the
            blocking of your Tinder account.
          </p>
        </div>
      </div>
    </div>
  );
};
