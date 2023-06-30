import { Skeleton } from '@shared/ui';
import styles from './Map.module.scss'

export const MapLazy = () => {
  return <Skeleton className={styles.lazy} width={375} height={300} />;
};
