import { HTMLAttributes } from 'react';

import { Radius } from '@/types/uiTypes';

import { skeletonStyles } from './styles';

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  width: string;
  height: string;
  radius?: Radius;
}

export const Skeleton = ({
  width,
  height,
  radius = 0,
  ...props
}: SkeletonProps) => {
  return <div css={skeletonStyles(width, height, radius)} {...props} />;
};
