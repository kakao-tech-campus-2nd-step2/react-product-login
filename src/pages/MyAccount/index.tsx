import styled from '@emotion/styled';

import { Button } from '@/components/common/Button';
import { Spacing } from '@/components/common/layouts/Spacing';
import { useAuth } from '@/provider/Auth';
import { RouterPath } from '@/routes/path';

export const MyAccountPage = () => {
  const { authInfo, logout } = useAuth();

  const handleLogout = () => {
    logout();
    const redirectURL = `${window.location.origin}${RouterPath.home}`;
    window.location.replace(redirectURL); // 로그아웃 후 홈으로 리다이렉트
  };

  if (!authInfo) {
    // 로그인 정보가 없으면 로그인 페이지로 리다이렉트
    window.location.replace(`${window.location.origin}${RouterPath.login}`);
    return null;
  }

  return (
    <Wrapper>
      {authInfo.name}님 안녕하세요! <Spacing height={64} />
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
