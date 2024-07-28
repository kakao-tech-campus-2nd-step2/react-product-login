import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
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

const renderProduct = (initialEntries: string[]) =>
  render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={createMemoryRouter(routes, { initialEntries })} />
    </QueryClientProvider>,
  );

test('productId에 맞는 상품 정보가 올바르게 렌더링되는지 확인', async () => {
  // Given: productId가 주어진다.
  const productId = '3245119';

  // When: Product 페이지 컴포넌트 렌더링시 모의 데이터를 가져온다.
  renderProduct([`/products/${productId}`]);

  // Then
  await waitFor(() => {
    const name = screen.getByTestId('product-name');
    // 상품 이름이 렌더링된다.
    expect(name).toHaveTextContent('[단독각인] 피렌체 1221 에디션 오드코롱 50ml (13종 택1)');

    // 상품 가격이 렌더링된다.
    const price = screen.getByTestId('product-price');
    expect(price).toHaveTextContent('145000원');

    // 상품 이미지가 렌더링된다.
    const image = screen.getByTestId('product-image');
    expect(image).toHaveAttribute(
      'src',
      'https://st.kakaocdn.net/product/gift/product/20240215083306_8e1db057580145829542463a84971ae3.png',
    );
  });
});

test('수량 증가 버튼을 클릭하면 숫자가 증가하는지 확인', async () => {
  // Given: productId가 주어진다.
  const productId = '3245119';

  // When: ProductOrder 페이지 컴포넌트 렌더링시 모의 데이터를 가져온다.
  renderProduct([`/products/${productId}`]);

  const incrementButton = screen.getByTestId('increment-button');
  expect(screen.getByDisplayValue('1')).toBeInTheDocument();
  fireEvent.click(incrementButton);

  // Then: 수량 증가 버튼을 클릭하면 값이 2가 되는지 확인한다.
  expect(screen.getByDisplayValue('2')).toBeInTheDocument();
});

test('수량 감소 버튼을 클릭하면 숫자가 감소하는지 확인', async () => {
  // Given: productId가 주어진다.
  const productId = '3245119';

  // When: ProductOrder 페이지 컴포넌트 렌더링시 모의 데이터를 가져온다.
  renderProduct([`/products/${productId}`]);

  const decrementButton = screen.getByTestId('decrement-button');
  expect(screen.getByDisplayValue('1')).toBeInTheDocument();
  fireEvent.click(decrementButton);

  // Then: 수량 감소 버튼을 클릭하면 값이 1가 되는지 확인한다.
  expect(screen.getByDisplayValue('1')).toBeInTheDocument();
});
