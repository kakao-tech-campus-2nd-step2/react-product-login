import { Box, Button as ChakraButton,Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import { fetchWithTokenInstance } from '@/api/instance';
import { Button } from '@/components/common/Button';
import { Spacing } from '@/components/common/layouts/Spacing';
import { useAuth } from '@/provider/Auth';
import { RouterPath } from '@/routes/path';

// 관심 목록 아이템 타입 정의
interface WishlistItem {
  id: number;
  name: string;
}

export const MyAccountPage = () => {
  const { authInfo, logout } = useAuth();
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]); // 초기 타입 설정

  useEffect(() => {
    const fetchWishList = async () => {
      try {
        const response = await fetchWithTokenInstance.get('/wishlist');
        setWishlist(response.data);
      } catch (error) {
        console.error('관심 목록 불러오기 실패', error);
      }
    };
    fetchWishList();
  }, []);

  const handleRemove = async (productId: number) => { // 타입 추가
    try {
      await fetchWithTokenInstance.delete(`/wishlist/${productId}`);
      setWishlist(wishlist.filter(item => item.id !== productId));
    } catch (error) {
      console.error('관심 상품 삭제 실패', error);
      alert('관심 상품 삭제에 실패하였습니다.');
    }
  };

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
      <Box mt={40}>
        <Text fontSize="2xl" mb={4}>관심 목록</Text>
        {wishlist.map(item => (
          <Box
            key={item.id}
            p={4}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            mb={4}
          >
            <Text>{item.name}</Text>
            <ChakraButton colorScheme="red" onClick={() => handleRemove(item.id)}>삭제</ChakraButton>
          </Box>
        ))}
      </Box>
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
