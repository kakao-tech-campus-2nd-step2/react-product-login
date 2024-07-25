import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';

import { fetchInstance } from '../instance';
import { PRODUCTS_MOCK_DATA } from './products.mock';
import { useGetProducts } from './useGetProducts';

jest.mock('../instance', () => ({
  fetchInstance: {
    get: jest.fn(),
  },
}));

const queryClient = new QueryClient();

const TestComponent = ({ categoryId }: { categoryId: string }) => {
  const { data, isLoading, isError, fetchNextPage } = useGetProducts({
    categoryId,
    maxResults: 20,
    initPageToken: '0'
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  return (
    <div>
      {data?.pages.flatMap(page => page.products).map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
      <button onClick={() => fetchNextPage()}>더 보기</button>
      <div data-testid='check'>
        {JSON.stringify(data?.pages[0])}
      </div>
    </div>
  );
};

test('useGetProducts 가 성공적으로 상품 Fetching 및 페이지네이션 handling', async () => {
 // Given: mock 데이터 설정
  (fetchInstance.get as jest.Mock).mockResolvedValue({
    data: PRODUCTS_MOCK_DATA,
  });

  // When: 컴포넌트를 렌더링하고, 데이터 로딩 완료를 기다림
  render(
    <QueryClientProvider client={queryClient}>
      <TestComponent categoryId="2920" />
    </QueryClientProvider>
  );

  // Then: 초기 상태 확인 (로딩 중)
  expect(screen.getByText('Loading...')).toBeInTheDocument();

  // 데이터 로딩 후 상태 확인
  await waitFor(() => expect(screen.getByText(PRODUCTS_MOCK_DATA.content[0].name)).toBeInTheDocument());

  // data-testid='check' 로 데이터를 가져와서 검증
  const dataElement = screen.getByTestId('check');
  const data = JSON.parse(dataElement.textContent || '{}');

  expect(data).toEqual({
    products: PRODUCTS_MOCK_DATA.content,
    nextPageToken: undefined,
    pageInfo: {
      totalResults: PRODUCTS_MOCK_DATA.totalElements,
      resultsPerPage: PRODUCTS_MOCK_DATA.size,
    },
  });

  // 추가적으로 '더 보기' 버튼이 있는지 확인
  expect(screen.getByText('더 보기')).toBeInTheDocument();
});