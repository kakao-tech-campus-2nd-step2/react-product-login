import styled from '@emotion/styled';

import { Image } from '@/components/common/Image';
import { Container as CommonContainer } from '@/components/common/layouts/Container';
import { breakpoints } from '@/styles/variants';

export const SelectFriendsBanner = () => (
  <Wrapper>
    <Container flexDirection="row" alignItems="center">
      <SelectImage
        src="https://gift-s.kakaocdn.net/dn/gift/images/m640/bg_profile_default.png"
        alt="친구 선택 유도 아이콘"
        onClick={() => {
          alert('선물 받을 친구 선택하기');
        }}
      />
      <Text>선물 받을 친구를 선택해주세요.</Text>
    </Container>
  </Wrapper>
);

const Wrapper = styled.section`
  width: 100%;
  height: 76px;
  padding: 18px 16px;

  background: #fafafa;

  @media screen and (min-width: ${breakpoints.sm}) {
    height: 150px;
    padding: 40px 16px;
  }
`;

const Container = styled(CommonContainer)`
  height: 100%;
`;

const SelectImage = styled(Image)`
  width: 40px;
  height: 40px;
  border-radius: 16px;
  cursor: pointer;

  @media screen and (min-width: ${breakpoints.sm}) {
    width: 70px;
    height: 70px;
    border-radius: 24px;
  }
`;

const Text = styled.p`
  padding-left: 16px;
  font-size: 17px;
  line-height: 22px;
  color: #333;
  font-weight: 500;

  @media screen and (min-width: ${breakpoints.sm}) {
    font-size: 28px;
    line-height: 35px;
  }
`;
