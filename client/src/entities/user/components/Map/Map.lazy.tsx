import type { FC } from 'react';
import { Skeleton } from '@shared/ui';
import styles from './Map.module.scss';

interface MapLazyProps {
  isMobile: boolean;
}

export const MapLazy: FC<MapLazyProps> = ({ isMobile }) => {
  const width = isMobile ? '100%' : 375;
  return <Skeleton className={styles.lazy} width={width} height={300} />;
};
