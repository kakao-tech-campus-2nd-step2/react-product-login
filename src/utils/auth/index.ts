import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/provider/Auth';
import { getDynamicPath } from '@/routes/path';

export const useAuthUtils = () => {
  const authInfo = useAuth();
  const navigate = useNavigate();

  const isAuthenticated = (): boolean => {
    return !!authInfo; // 인증된 경우 true, 그렇지 않은 경우 false 반환
  };

  const redirectToLoginPage = (): void => {
    navigate(getDynamicPath.login());
  };

  return { isAuthenticated, redirectToLoginPage };
};

export const useRedirectToLoginByAuth = () => {
  const { isAuthenticated, redirectToLoginPage } = useAuthUtils();

  const checkAuthAndRedirect = (): boolean => {
    if (!isAuthenticated()) {
      const isConfirm = window.confirm(
        '로그인이 필요한 메뉴입니다.\n로그인 페이지로 이동하시겠습니까?',
      );

      if (isConfirm) {
        redirectToLoginPage();
        return false;
      }
    }
    return true; //인증된 경우 true
  };

  return checkAuthAndRedirect;
};
