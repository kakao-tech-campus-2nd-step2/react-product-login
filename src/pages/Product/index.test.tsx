import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClientProvider } from '@tanstack/react-query';
import App from '@/App';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { queryClient } from '@apis/instance';
import Product from '.';

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'products/:productId',
        element: <Product />,
      },
    ],
  },
];

test('productId에 맞는 상품 정보가 올바르게 렌더링되는지 확인', async () => {
  // Given: productId가 주어진다.
  const productId = '3245119';

  const router = createMemoryRouter(routes, {
    initialEntries: [`/products/${productId}`],
  });

  // When: Product 페이지 컴포넌트 렌더링시 모의 데이터를 가져온다.
  render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  );

  // Then
  await waitFor(() => {
    // 상품 이름이 렌더링된다.
    expect(screen.getByText('[단독각인] 피렌체 1221 에디션 오드코롱 50ml (13종 택1)')).toBeInTheDocument();

    // 상품 가격이 렌더링된다.
    expect(screen.getByText('145000원')).toBeInTheDocument();

    // 상품 이미지가 렌더링된다.
    const image = screen.getByTestId('product-image');
    expect(image).toHaveAttribute(
      'src',
      'https://st.kakaocdn.net/product/gift/product/20240215083306_8e1db057580145829542463a84971ae3.png',
    );
  });
});
