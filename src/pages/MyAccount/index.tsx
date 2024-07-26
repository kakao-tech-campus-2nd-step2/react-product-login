import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/common/Button';
import { Spacing } from '@/components/common/layouts/Spacing';
import { useAuth } from '@/provider/Auth';
import { RouterPath } from '@/routes/path';
import { authSessionStorage } from '@/utils/storage';

export const MyAccountPage = () => {
  const authInfo = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    authSessionStorage.set(undefined);

    const redirectURL = `${window.location.origin}${RouterPath.home}`;
    window.location.replace(redirectURL);
  };

  const handleFavorites = () => {
    navigate('/favorites'); // 관심 목록 페이지로 이동
  };

  return (
    <Wrapper>
      {authInfo?.name}님 안녕하세요!
      <Spacing height={64} />
      <ButtonContainer>
        <StyledButton onClick={handleLogout}>로그아웃</StyledButton>
        <StyledButton onClick={handleFavorites}>관심 목록</StyledButton>
      </ButtonContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  padding: 80px 0 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 36px;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px; /* 버튼 간격 조정 */
`;

const StyledButton = styled(Button)`
  width: 200px;
  height: 50px; /* 버튼 높이 조정 */
  font-size: 16px; /* 폰트 크기 조정 */
`;
