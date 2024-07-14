import styled from '@emotion/styled';

import { Image } from '@/components/common/Image';
import { breakpoints } from '@/styles/variants';

type Props = {
  image: string;
  label: string;
} & React.HTMLAttributes<HTMLDivElement>;

export const ThemeCategoryItem = ({ image, label, ...props }: Props) => (
  <Wrapper {...props}>
    <CategoryImage src={image} alt={label} />
    <Label>{label}</Label>
  </Wrapper>
);

const Wrapper = styled.div`
  width: 100%;
  padding: 13px 0 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media screen and (min-width: ${breakpoints.sm}) {
    padding: 25px 35px 24px;
  }
`;

const CategoryImage = styled(Image)`
  width: 100%;
  height: 100%;
  max-width: 50px;
  max-height: 50px;

  border-radius: 18px;

  @media screen and (min-width: ${breakpoints.sm}) {
    max-width: 90px;
    max-height: 90px;
    border-radius: 32px;
  }
`;

const Label = styled.p`
  padding-top: 5px;
  font-size: 13px;
  line-height: 17px;
  color: #333;

  @media screen and (min-width: ${breakpoints.sm}) {
    padding-top: 7px;
    font-size: 16px;
    line-height: 28px;
  }
`;
