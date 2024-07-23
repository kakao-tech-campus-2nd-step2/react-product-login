import { keyframes } from '@emotion/react';

// eslint-disable-next-line import/prefer-default-export
export const skeletonGradient = keyframes`
  0% {
    background-color: rgba(165, 165, 165, 0.1);
  }

  50% {
    background-color: rgba(165, 165, 165, 0.3);
  }

  100% {
    background-color: rgba(165, 165, 165, 0.1);
  }
`;
