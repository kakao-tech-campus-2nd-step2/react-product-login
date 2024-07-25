import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import { useGetProductDetail } from '@/api/hooks/useGetProductDetail';
import { useGetProductOptions } from '@/api/hooks/useGetProductOptions';
import { worker } from '@/mocks/browser';

import { GoodsDetailPage } from './index';


// useGetProductDetail, useGetProductOptions 모킹
jest.mock('@src/api/hooks/useGetProductDetail', () => ({
  useGetProductDetail: jest.fn(),
}));

jest.mock('@src/api/hooks/useGetProductOptions', () => ({
  useGetProductOptions: jest.fn(),
}));


describe('GoodsDetailPage', () => {
  beforeAll(() => { // 모든 테스트 실행 전 msw 워커 시작
    worker.start();
  });

  afterEach(() => {
    worker.resetHandlers(); // 각 테스트 실행 후 모든 요청 핸들러 리셋
  });

  afterAll(() => {
    worker.stop();  // 모든 테스트 완료 후 msw 워커 중지
  });

  test('ProductDetail과 ProductOptions 올바르게 렌더링', async () => {
    (useGetProductDetail as jest.Mock).mockReturnValue({
      data: {
        id: '1',
        name: 'Mock Product',
        description: 'This is a mock product.',
      },
    });

    // useGetProductOptions 훅을 모킹하여 특정 옵션 데이터 반환
    (useGetProductOptions as jest.Mock).mockReturnValue({
      data: [
        { id: 1, name: 'Option A', quantity: 10, productId: 1 },
        { id: 2, name: 'Option B', quantity: 20, productId: 1 },
      ],
    });

    
    render(
      <Router>
        <GoodsDetailPage />
      </Router>
    );

    
    expect(screen.getByText(/Mock Product/i)).toBeInTheDocument();  // 상품 이름
    expect(screen.getByText(/This is a mock product./i)).toBeInTheDocument();   // 상품 설명

    // 옵션 A와 옵션 B가 화면에 ㄹ
    await waitFor(() => {
      expect(screen.getByText(/Option A/i)).toBeInTheDocument();
      expect(screen.getByText(/Option B/i)).toBeInTheDocument();
    });
  });
});
