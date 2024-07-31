import styled from '@emotion/styled';
import { Link, useNavigate } from 'react-router-dom';

import { Container } from '@/components/common/layouts/Container';
import { useAuth } from '@/provider/Auth';
import { getDynamicPath, RouterPath } from '@/routes/path';

export const Header = () => {
  const navigate = useNavigate();
  const authInfo = useAuth();

  const NavButtonList = [
    { name: '홈', path: RouterPath.home },
    { name: '위시', path: RouterPath.wish },
  ];

  const handleLogin = () => {
    navigate(getDynamicPath.login());
  };

  return (
    <Wrapper>
      <Container flexDirection="row" alignItems="center" justifyContent="space-between">
        <LogoWrapper>
          <Link to={RouterPath.home}>
            <Logo
              src="https://gift-s.kakaocdn.net/dn/gift/images/m640/pc_gift_logo.png"
              alt="카카오 선물하기 로고"
            />
          </Link>
        </LogoWrapper>
        <NavBarWrapper>
          <NavBar>
            {NavButtonList.map((button) => (
              <NavButton key={button.name}>
                <NavButtonText
                  to={button.path}
                  aria-current={location.pathname === button.path ? 'page' : undefined}
                >
                  {button.name}
                </NavButtonText>
              </NavButton>
            ))}
          </NavBar>
        </NavBarWrapper>
        <RightWrapper>
          {authInfo ? (
            <LinkButton onClick={() => navigate(RouterPath.myAccount)}>내 계정</LinkButton>
          ) : (
            <LinkButton onClick={handleLogin}>로그인</LinkButton>
          )}
        </RightWrapper>
      </Container>
    </Wrapper>
  );
};

export const HEADER_HEIGHT = '74px';

export const Wrapper = styled.header`
  position: fixed;
  z-index: 9999;
  width: 100%;
  max-width: 100vw;
  height: ${HEADER_HEIGHT};
  background-color: #fff;
  padding: 0 16px;
`;

const LogoWrapper = styled.div`
  padding-right: 50px;
  height: auto;
`;

const Logo = styled.img`
  height: ${HEADER_HEIGHT};
`;

const NavBarWrapper = styled.nav`
  padding: 20px 20px 20px 0;
`;

const NavBar = styled.ul`
  display: flex;
  list-style: none;
`;

const NavButton = styled.li`
  position: relative;
  padding-right: 10px;
  list-style: none;
`;

const NavButtonText = styled(Link)`
  display: block;
  padding: 11px 10px 7px;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;

  &[aria-current='page']:after {
    position: absolute;
    left: 8px;
    right: 16px;
    bottom: 5px;
    height: 2px;
    background-color: #000;
    content: '';
  }
`;

const RightWrapper = styled.div`
  margin-left: auto;
`;

const LinkButton = styled.p`
  align-items: center;
  font-size: 14px;
  color: #000;
  text-decoration: none;
  cursor: pointer;
`;
