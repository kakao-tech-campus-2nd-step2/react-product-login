import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen,waitFor } from '@testing-library/react';

import { fetchInstance } from '../instance';
import { CATEGORIES_RESPONSE_DATA } from './categories.mock';
import { useGetCategories } from './useGetCategorys';

jest.mock('../instance', () => ({
  fetchInstance: {
    get: jest.fn(),
  },
}));

const queryClient = new QueryClient();

const TestComponent = () => {
  const { data, isLoading, isError } = useGetCategories();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  return (
    <div>
      {data?.map(category => (
        <div key={category.id}>{category.name}</div>
      ))}
    </div>
  );
};

test('useGetCategories 가 성공적으로 카테고리를 Fetching', async () => {
  // Given: mock 데이터 설정
  (fetchInstance.get as jest.Mock).mockResolvedValue({
    data: CATEGORIES_RESPONSE_DATA,
  });

  // When: 컴포넌트를 렌더링하고, 데이터 로딩 완료를 기다림
  render(
    <QueryClientProvider client={queryClient}>
      <TestComponent />
    </QueryClientProvider>
  );

  // Then: 초기 상태 확인 (로딩 중)
  expect(screen.getByText('Loading...')).toBeInTheDocument();

  // 데이터 로딩 후 상태 확인
  await waitFor(() => expect(screen.getByText(CATEGORIES_RESPONSE_DATA[0].name)).toBeInTheDocument());

  // 데이터가 정상적으로 로드되었는지 확인
  CATEGORIES_RESPONSE_DATA.forEach(category => {
    expect(screen.getByText(category.name)).toBeInTheDocument();
  });
});
