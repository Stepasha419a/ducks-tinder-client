import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import duckImg from '@shared/assets/images/auth-duck.png';
import { ROUTES } from '@shared/lib/constants';
import { withPrivatePageHocs } from '@shared/lib/hocs';
import styles from './NotFound.module.scss';
import {
  contentVariants,
  imgVariants,
  lineVariants,
} from './NotFound.variants';

export const NotFound = () => {
  return (
    <div className={styles.wrapper}>
      <motion.div
        variants={contentVariants}
        initial={'initial'}
        whileHover={'hover'}
        className={styles.content}
      >
        <Link className={styles.link} to={ROUTES.MAIN}>
          <h1 className={styles.title}>404</h1>
          <motion.div variants={lineVariants} className={styles.line} />
          <h2 className={styles.text}>NOT FOUND</h2>
          <motion.img
            variants={imgVariants}
            className={styles.img}
            src={duckImg}
            alt="duck"
          />
        </Link>
      </motion.div>
    </div>
  );
};

export default withPrivatePageHocs(NotFound);
