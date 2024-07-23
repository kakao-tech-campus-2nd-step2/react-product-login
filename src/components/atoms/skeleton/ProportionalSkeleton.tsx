import {
  SkeletonInner,
  SkeletonWrapper,
} from '@components/atoms/skeleton/ProportionalSkeleton.styles';
import { ProportionalSkeletonProps } from '@/types';

function ProportionalSkeleton({ ratio }: ProportionalSkeletonProps) {
  return (
    <SkeletonWrapper ratio={ratio} radius="3px">
      <SkeletonInner />
    </SkeletonWrapper>
  );
}

export default ProportionalSkeleton;
