import styled from '@emotion/styled';

type Props = React.HTMLAttributes<HTMLSpanElement>;

export const HeadingText = ({ children, ...props }: Props) => {
  return <Wrapper {...props}>{children}</Wrapper>;
};

export const Wrapper = styled.span`
  font-size: 18px;
  line-height: 21px;
  color: #222;
  box-sizing: border-box;
  font-weight: 700;
`;
