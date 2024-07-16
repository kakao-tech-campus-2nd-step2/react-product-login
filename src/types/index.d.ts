import { CSSProperties, InputHTMLAttributes, ReactNode } from 'react';
import FetchStatus from '@constants/FetchStatus';
import { ThemeData } from '@/dto';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  elementSize: ElementSize,
  invalid?: boolean,
  errorMessage?: string,
}

export interface GoodsItemProps {
  rankingIndex?: number,
  imageSrc: string,
  subtitle: string,
  title: string,
  amount: number,
}

export interface RankingBadgeProps {
  rankingIndex?: number;
}

export interface BreakpointGridProps {
  columnsXS?: number,
  columnsSm?: number,
  columnsMd?: number,
  columnsLg?: number,
  columnsDefault: number,
  gap?: number,
}

interface ContainerProps {
  maxWidth?: string,
  elementSize?: ContainerSize,
  flexDirection?: 'row' | 'column',
  justifyContent?: 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around',
  alignItems?: 'center' | 'flex-start' | 'flex-end' | 'baseline' | 'stretch',
  children?: ReactNode,
  backgroundColor?: string;
  cssProps?: CSSProperties;
  padding?: string;
}

interface ResponsiveContainerProps extends ContainerProps { // padding은 어떻게 하지?
  sizeDefault: ContainerSize;
  sizeXS?: ContainerSize;
  sizeSm?: ContainerSize;
  sizeMd?: ContainerSize;
  sizeLg?: ContainerSize;
}

interface ProportionalSkeletonProps {
  ratio: number | 'full-square';
  radius?: string;
}

interface SizedSkeletonProps {
  elementSize: FixedSize;
  radius?: string;
}

export interface FixedSize {
  width: string,
  height: string,
}

export type ThemeDataRepository = { [key: string]: ThemeData };

export type FetchStatusType = typeof FetchStatus[string];

export type ContainerSize = FixedSize | 'full-width';

export type ElementSize = FixedSize | 'responsive' | 'small' | 'big';

export type TargetFilter = 'ALL' | 'FEMALE' | 'MALE' | 'TEEN';

export type RankFilter = 'MANY_WISH' | 'MANY_RECEIVE' | 'MANY_WISH_RECEIVE';
