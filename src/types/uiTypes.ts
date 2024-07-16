import { breakpoint } from '@/styles/variants/breakpoint';

export type Theme = 'kakao' | 'outline' | 'black' | 'lightGray' | 'darkGray';

export type Size = 'small' | 'medium' | 'large' | 'response';

export type FlexDirection = 'row' | 'column';

export type JustifyContent =
  | 'center'
  | 'flex-start'
  | 'flex-end'
  | 'space-between'
  | 'space-around';

export type AlignItems =
  | 'center'
  | 'flex-start'
  | 'flex-end'
  | 'baseline'
  | 'stretch';

export type ResponseGrid = {
  [key in keyof typeof breakpoint]?: number;
};

export type Radius = number | 'circle';

export type Ratio = number | 'square' | 'auto';
