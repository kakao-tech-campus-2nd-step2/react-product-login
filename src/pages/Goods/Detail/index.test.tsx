import type { UseSuspenseQueryResult } from '@tanstack/react-query';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import * as productDetailHooks from '@/api/hooks/useGetProductDetail';
import * as productOptionsHooks from '@/api/hooks/useGetProductOptions';
import type { AuthInfo } from '@/provider/Auth';
import * as authHooks from '@/provider/Auth';
import type { ProductData, ProductOptionsData } from '@/types';

import { GoodsDetailPage } from './index';

// 모듈을 모킹
jest.mock('@/api/hooks/useGetProductDetail');
jest.mock('@/api/hooks/useGetProductOptions');
jest.mock('@/provider/Auth');

const queryClient = new QueryClient();

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={['/product/1']}>
        <Routes>
          <Route path="/product/:productId" element={ui} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>,
  );
};

describe('GoodsDetailPage', () => {
  const mockProductDetail: ProductData = {
    id: 1,
    name: 'Test Product',
    price: 1000,
    imageUrl: 'https://example.com/image.jpg',
    categoryId: 1,
  };

  const mockProductOptions: ProductOptionsData[] = [
    { id: 1, name: 'Option 1', quantity: 10, productId: 1 },
  ];

  const mockQuerySuccessResult = {
    data: mockProductDetail,
    isLoading: false,
    isError: false,
    error: null,
    isSuccess: true,
    isFetching: false,
    refetch: jest.fn(),
    dataUpdatedAt: Date.now(),
    errorUpdatedAt: Date.now(),
    failureCount: 0,
    isFetched: true,
    isFetchedAfterMount: true,
    isInitialLoading: false,
    isRefetching: false,
    status: 'success',
    isPaused: false,
    isPlaceholderData: false,
    isPreviousData: false,
    errorUpdateCount: 0,
    isPending: false,
    isLoadingError: false,
    isRefetchError: false,
    failureReason: null,
    fetchStatus: 'idle',
    isStale: false,
  } as UseSuspenseQueryResult<ProductData, Error>;

  const mockQueryErrorResult = {
    data: undefined,
    isLoading: false,
    isError: true,
    error: new Error('Error fetching product details'),
    isSuccess: false,
    isFetching: false,
    refetch: jest.fn(),
    dataUpdatedAt: Date.now(),
    errorUpdatedAt: Date.now(),
    failureCount: 0,
    isFetched: false,
    isFetchedAfterMount: false,
    isInitialLoading: false,
    isRefetching: false,
    status: 'error',
    isPaused: false,
    isPlaceholderData: false,
    isPreviousData: false,
    errorUpdateCount: 0,
    isPending: false,
    isLoadingError: false,
    isRefetchError: false,
    failureReason: null,
    fetchStatus: 'idle',
    isStale: false,
  } as unknown as UseSuspenseQueryResult<ProductData, Error>;

  beforeEach(() => {
    const useGetProductDetailMock = jest.spyOn(productDetailHooks, 'useGetProductDetail');
    const useGetProductOptionsMock = jest.spyOn(productOptionsHooks, 'useGetProductOptions');
    const useAuthMock = jest.spyOn(authHooks, 'useAuth');

    // Given: 상품 상세 정보와 옵션 데이터를 반환하도록 훅을 모킹
    useGetProductDetailMock.mockReturnValue(mockQuerySuccessResult);

    useGetProductOptionsMock.mockReturnValue({
      data: mockProductOptions,
      isLoading: false,
      isError: false,
      error: null,
      isSuccess: true,
      isFetching: false,
      refetch: jest.fn(),
      dataUpdatedAt: Date.now(),
      errorUpdatedAt: Date.now(),
      failureCount: 0,
      isFetched: true,
      isFetchedAfterMount: true,
      isInitialLoading: false,
      isRefetching: false,
      status: 'success',
      isPaused: false,
      isPlaceholderData: false,
      isPreviousData: false,
      errorUpdateCount: 0,
      isPending: false,
      isLoadingError: false,
      isRefetchError: false,
      failureReason: null,
      fetchStatus: 'idle',
      isStale: false,
    } as UseSuspenseQueryResult<ProductOptionsData[], Error>);

    useAuthMock.mockReturnValue(undefined); // Given: 사용자가 로그인되지 않은 상태
  });

  it('should load product detail and options on page load', async () => {
    // Given: 페이지가 로드되었을 때
    renderWithProviders(<GoodsDetailPage />);

    // When: 상품 상세 정보와 옵션을 로드하는 동안
    expect(screen.getByText('로딩 중...')).toBeInTheDocument();

    // Then: 상품 상세 정보와 옵션이 로드되었는지 확인
    await waitFor(() => {
      expect(screen.getByText('Test Product')).toBeInTheDocument();
      expect(screen.getByText('Option 1')).toBeInTheDocument();
    });
  });

  it('should calculate total price correctly when option is selected', async () => {
    // Given: 상품 상세 페이지가 로드된 상태에서
    renderWithProviders(<GoodsDetailPage />);

    await waitFor(() => {
      expect(screen.getByText('Test Product')).toBeInTheDocument();
    });

    // When: 옵션 수량을 변경할 때
    const input = screen.getByDisplayValue('1');
    fireEvent.change(input, { target: { value: '2' } });

    // Then: 총 결제 금액이 올바르게 계산되었는지 확인
    await waitFor(() => {
      expect(screen.getByText('총 결제 금액 2000원')).toBeInTheDocument();
    });
  });

  it('should prompt login when not authenticated and trying to order', async () => {
    // Given: 상품 상세 페이지가 로드된 상태에서
    renderWithProviders(<GoodsDetailPage />);

    await waitFor(() => {
      expect(screen.getByText('Test Product')).toBeInTheDocument();
    });

    // When: 로그인되지 않은 상태에서 주문하기 버튼을 클릭할 때
    const orderButton = screen.getByText('나에게 선물하기');
    fireEvent.click(orderButton);

    // Then: 로그인 알림이 표시되는지 확인
    await waitFor(() => {
      expect(window.confirm).toHaveBeenCalledWith(
        '로그인이 필요한 메뉴입니다.\n로그인 페이지로 이동하시겠습니까?',
      );
    });
  });

  it('should navigate to order page when authenticated and ordering', async () => {
    // Given: 사용자가 로그인된 상태에서
    const mockAuthInfo: AuthInfo = { id: '123', name: 'Test User', token: 'abc123' };
    jest.spyOn(authHooks, 'useAuth').mockReturnValue(mockAuthInfo);
    renderWithProviders(<GoodsDetailPage />);

    await waitFor(() => {
      expect(screen.getByText('Test Product')).toBeInTheDocument();
    });

    // When: 주문하기 버튼을 클릭할 때
    const orderButton = screen.getByText('나에게 선물하기');
    fireEvent.click(orderButton);

    // Then: 주문 페이지로 이동하는지 확인
    await waitFor(() => {
      expect(window.location.pathname).toBe('/order');
    });
  });

  it('should display error page when there is an error', async () => {
    // Given: 상품 상세 정보를 가져오는 중 에러가 발생한 상태에서
    const useGetProductDetailMock = jest.spyOn(productDetailHooks, 'useGetProductDetail');
    useGetProductDetailMock.mockReturnValue(mockQueryErrorResult);

    renderWithProviders(<GoodsDetailPage />);

    // Then: 에러 페이지가 표시되는지 확인
    await waitFor(() => {
      expect(screen.getByText('에러 페이지')).toBeInTheDocument();
    });
  });
});
