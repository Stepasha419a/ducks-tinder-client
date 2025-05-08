import type { FC } from 'react';
import SkeletonLib from 'react-loading-skeleton';
import type { SkeletonProps } from 'react-loading-skeleton/dist/Skeleton';

import 'react-loading-skeleton/dist/skeleton.css';

export const Skeleton: FC<SkeletonProps> = (props) => {
  return <SkeletonLib baseColor="#d3d3d3" {...props} />;
};
