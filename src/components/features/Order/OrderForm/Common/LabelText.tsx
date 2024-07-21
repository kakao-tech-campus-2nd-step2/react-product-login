import styled from '@emotion/styled';

type Props = React.HTMLAttributes<HTMLSpanElement>;

export const LabelText = ({ children, ...props }: Props) => {
  return <Wrapper {...props}>{children}</Wrapper>;
};

export const Wrapper = styled.span`
  font-size: 15px;
  line-height: 24px;
  font-weight: 700;
  color: #000;
`;
