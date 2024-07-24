import { keyframes } from '@emotion/react';

export const sync = keyframes`
  33% {
    transform: translateY(5px);
  }
  66% {
    transform: translateY(-5px);
  }
  100% {
    transform: translateY(0);
  }
`;

export const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
`;
