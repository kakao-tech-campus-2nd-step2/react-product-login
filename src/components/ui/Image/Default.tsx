import { ImgHTMLAttributes, useState } from 'react';

import { Radius, Ratio } from '@/types/uiTypes';

import { backgroundStyle, imageStyle } from './styles';

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  ratio?: Ratio;
  radius?: Radius;
  width?: string;
  src: string;
  isLazy?: boolean;
}

export const Image = ({
  ratio = 'auto',
  radius = 0,
  width = '100%',
  src,
  alt,
  isLazy = false,
  ...props
}: ImageProps) => {
  const [isLoad, setIsLoad] = useState(false);

  return (
    <div css={backgroundStyle(isLazy, isLoad)}>
      <img
        css={imageStyle(isLoad, ratio, radius, width, isLazy)}
        alt={alt}
        src={src}
        width={600}
        height={600}
        onLoad={() => setIsLoad(true)}
        {...props}
      />
    </div>
  );
};
