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

  const handleGoToWishList = () => {
    navigate('/wishlist'); 
  };

  return (
    <Wrapper>
      {authInfo?.name}님 안녕하세요! <Spacing height={64} />
      <Button
        size="small"
        theme="darkGray"
        onClick={handleGoToWishList}
        style={{
          maxWidth: '200px',
        }}
      >
        위시리스트 보기
      </Button>
      <Spacing height={20} />
      <Spacing height={20} />
      <Button
        size="small"
        theme="darkGray"
        onClick={handleLogout}
        style={{
          maxWidth: '200px',
        }}
      >
        로그아웃
      </Button>
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
