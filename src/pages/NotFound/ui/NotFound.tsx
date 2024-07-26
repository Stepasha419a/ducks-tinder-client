import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { withPrivatePageHocs } from '@widgets/pagesLib';
import { authDuck } from '@shared/assets/images';
import { ROUTES } from '@shared/lib';
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
            src={authDuck}
            alt="duck"
          />
        </Link>
      </motion.div>
    </div>
  );
};

export default withPrivatePageHocs(NotFound);
