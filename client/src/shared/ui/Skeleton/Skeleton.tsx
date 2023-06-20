import type { FC } from 'react';
import SkeletonLib from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import type { SkeletonProps } from 'react-loading-skeleton/dist/Skeleton';

export const Skeleton: FC<SkeletonProps> = (props) => {
  return <SkeletonLib baseColor="#d3d3d3" {...props} />;
};
