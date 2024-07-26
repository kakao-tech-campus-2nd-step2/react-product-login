import { useInfiniteQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useRef } from 'react';
import { axiosInstance } from '@utils/network';
import RequestURLs from '@constants/RequestURLs';
import { QueryKeys } from '@constants/QueryKeys';
import Container from '@components/atoms/container/Container';
import { MAX_CONTENT_WIDTH } from '@styles/size';
import { Text } from '@chakra-ui/react';
import { css } from '@emotion/react';
import ProductSkeletonGrid from '@components/molecules/skeleton/ProductSkeletonGrid';
import useInView from '@hooks/useInView';
import WishesContent from '@components/organisms/mypage/WishesContent';
import { WishedProductsRequestQuery } from '@/types/request';
import { WishedProductsResponse } from '@/types/response';
import { generateRandomId } from '@/utils';

const MAX_RESULTS_PER_PAGE = 20;

function WishesSection() {
  const wishSectionId = useRef(generateRandomId());
  const bottomRef = useRef<HTMLDivElement>(null);
  const fetchPage = useCallback(async ({ pageParam = 0 }) => {
    const params: WishedProductsRequestQuery = {
      size: MAX_RESULTS_PER_PAGE,
      page: pageParam,
      sort: 'name, asc',
    };
    const response = await axiosInstance.get<WishedProductsResponse>(
      RequestURLs.WISHES,
      {
        params,
      },
    );

    return response.data;
  }, []);
  const {
    data, fetchNextPage, hasNextPage, isFetchingNextPage,
  } = useInfiniteQuery({
    initialData: undefined,
    initialPageParam: undefined,
    queryKey: [QueryKeys.WISHES],
    queryFn: fetchPage,
    getNextPageParam: (lastPage) => (lastPage.last ? undefined : lastPage.pageable.pageNumber + 1),
  });
  const { inView } = useInView({ ref: bottomRef, threshold: 0.5 });

  useEffect(() => {
    if (!inView || !hasNextPage) return;

    fetchNextPage();
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <Container elementSize="full-width" maxWidth={MAX_CONTENT_WIDTH} flexDirection="column">
      <Text fontSize="large" fontWeight="bold">관심 상품 목록</Text>
      {data?.pages?.map((page, index) => {
        const key = `${wishSectionId}-${index}`;

        return (
          <WishesContent wishes={page.content} maxColumns={5} minColumns={5} key={key} />
        );
      })}
      {isFetchingNextPage ? (
        <ProductSkeletonGrid columnsDefault={4} itemCount={4} columnsSm={2} />
      ) : null}
      <div
        css={css`
          width: 100%;
          height: 100px;
        `}
        ref={bottomRef}
      />
    </Container>
  );
}

export default WishesSection;
