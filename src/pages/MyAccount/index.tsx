import styled from '@emotion/styled';

import { useDeleteWish } from '@/api/hooks/useDeleteWish';
import { useGetWishes } from '@/api/hooks/useGetWish';
import { Button } from '@/components/common/Button';
import { Spacing } from '@/components/common/layouts/Spacing';
import { LoadingView } from '@/components/common/View/LoadingView';
import { VisibilityLoader } from '@/components/common/VisibilityLoader';
import { useAuth } from '@/provider/Auth';
import { RouterPath } from '@/routes/path';
import { authSessionStorage } from '@/utils/storage';

export const MyAccountPage = () => {
  const authInfo = useAuth();
  const { data, isError, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } = useGetWishes(
    {},
  );
  const { mutate: deleteWish } = useDeleteWish();

  if (isLoading) return <LoadingView />;
  if (isError) return <TextView>에러가 발생했습니다.</TextView>;
  if (!data) return <></>;
  if (!data || !data.pages || data.pages.length === 0) return <TextView>상품이 없어요.</TextView>;

  const handleLogout = () => {
    authSessionStorage.set(undefined);
    const redirectURL = `${window.location.origin}${RouterPath.home}`;
    window.location.replace(redirectURL);
  };

  const handleRemoveWish = (id: number) => {
    deleteWish({ wishId: id.toString() });
    alert('삭제가 완료되었습니다.');
  };

  const flattenWishList = data.pages.map((page) => page?.wishes ?? []).flat();

  return (
    <Wrapper>
      {authInfo?.name}님 안녕하세요! <Spacing height={64} />
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
      <Spacing height={32} />
      <h2>관심 목록</h2>
      {flattenWishList.map(({ id, imageUrl, name, price }) => (
        <InterestItem key={id}>
          <Img height="50px" src={imageUrl} alt="사진" />
          <div>
            <span>{name}</span>
            <div>{price}</div>
            <Button size="small" onClick={() => handleRemoveWish(id)}>
              관심 삭제
            </Button>
          </div>
        </InterestItem>
      ))}
      {hasNextPage && (
        <VisibilityLoader
          callback={() => {
            if (!isFetchingNextPage) {
              fetchNextPage();
            }
          }}
        />
      )}
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

const InterestItem = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #ddd;
  span {
    font-size: 18px;
  }
`;

const TextView = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 16px 60px;
  font-size: 16px;
`;

const Img = styled.img`
  width: 20%;
`;
