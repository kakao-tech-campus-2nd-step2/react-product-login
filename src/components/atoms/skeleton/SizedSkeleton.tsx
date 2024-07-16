import styled from '@emotion/styled';
import { skeletonGradient } from '@styles/keyframes';
import { SizedSkeletonProps } from '@/types';

const SizedSkeleton = styled.div<SizedSkeletonProps>`
  width: ${({ elementSize }: SizedSkeletonProps) => (elementSize.width)};
  height: ${({ elementSize }: SizedSkeletonProps) => (elementSize.height)};
  border-radius: ${({ radius }: SizedSkeletonProps) => (radius)};
  position: relative;
  overflow: hidden;
  background-color: rgba(165, 165, 165, 0.1);
  animation: ${skeletonGradient} 1.5s infinite ease-in-out;
`;

export default SizedSkeleton;
