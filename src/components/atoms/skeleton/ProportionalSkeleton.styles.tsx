import styled from '@emotion/styled';
import { skeletonGradient } from '@styles/keyframes';
import { ProportionalSkeletonProps } from '@/types';

export const SkeletonWrapper = styled.div<ProportionalSkeletonProps>`
  width: 100%;
  padding-top: ${(props) => (typeof props.ratio === 'number' ? `${props.ratio * 100}%` : '100%')};
  position: relative;
  overflow: hidden;

  & div {
    background-color: rgba(165, 165, 165, 0.1);
    animation: ${skeletonGradient} 1.5s infinite ease-in-out;
    border-radius: ${(props) => (props.radius)}
  }
`;

export const SkeletonInner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(165, 165, 165, 0.1);
  animation: ${skeletonGradient} 1.5s infinite ease-in-out;
`;
