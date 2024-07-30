import styled from '@emotion/styled';

import { HEADER_HEIGHT } from '@/components/features/Layout/Header';
import { useAuth } from '@/provider/Auth';
import { breakpoints } from '@/styles/variants';

import { WishItem } from './WishItem';

export const Wish = () => {
  const authInfo = useAuth();

  return (
    <Wrapper>
      <HeadingText>
        {authInfo?.name}님의
        <br />
        위시리스트
      </HeadingText>
      <WishList>
        <WishItem
          // id={11111}
          name="[선물포장] 사봉 바디스크럽 320g (택1) + 우드스쿱 증정"
          imageURL="https://img1.kakaocdn.net/thumb/C320x320@2x.q82/?fname=https%3A%2F%2Fst.kakaocdn.net%2Fproduct%2Fgift%2Fproduct%2F20240719085807_c54daa7e0d584e65bf58f71a42c3133b.jpg"
          price={49000}
        />
      </WishList>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  width: 100%;
  min-height: calc(100vh - ${HEADER_HEIGHT});
  padding: 16px 16px 60px;
  border-left: 1px solid #ededed;

  @media screen and (min-width: ${breakpoints.sm}) {
    padding: 0 0 60px 28px;
  }
`;

const HeadingText = styled.h3`
  padding: 40px 0 30px;
  font-size: 28px;
  line-height: 38px;
  font-weight: bold;
  white-space: pre-line;
`;

const WishList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
`;
