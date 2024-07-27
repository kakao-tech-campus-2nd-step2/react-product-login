import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { GoodsDetail } from "@/components/features/Goods/Detail";
import { OptionSection } from "@/components/features/Goods/Detail/OptionSection";

const setup = (override = {}) => {
  const GoodsData = {
    id: 3245119,
    name: '[단독각인] 피렌체 1221 에디션 오드코롱 50ml (13종 택1)',
    imageUrl: 'https://st.kakaocdn.net/product/gift/product/20240215083306_8e1db057580145829542463a84971ae3.png',
    price: 145000,
  };

  const queryClient = new QueryClient();

  return {
    GoodsData: { ...GoodsData, ...override },
    queryClient: queryClient,
  };
}

test('상품의 상세 정보를 올바르게 렌더링', async () => {
  const { GoodsData, queryClient } = setup();

  render(
    <QueryClientProvider client={queryClient}>
      <GoodsDetail productId={GoodsData.id.toString()} />
    </QueryClientProvider>
  );

  const name = await screen.findByText(GoodsData.name);
  const image = screen.getByAltText(GoodsData.name);
  const price = screen.getByText(`${GoodsData.price}원`);

  expect(name).toBeInTheDocument();
  expect(image).toBeInTheDocument();
  expect(price).toBeInTheDocument();
});

test('상품 수량 변경하면 총 결제 금액 업데이트', async () => {
  const { GoodsData, queryClient } = setup();

  render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <OptionSection productId={GoodsData.id.toString()} />
      </MemoryRouter>
    </QueryClientProvider>
  );

  const input = await screen.findByLabelText('수량 입력');
  const defaultPrice = screen.getByText(`${GoodsData.price}원`);

  expect(defaultPrice).toBeInTheDocument();

  fireEvent.change(input, { target: { value: '2' }});

  const testPrice = screen.getByText(`${GoodsData.price * 2}원`);

  expect(testPrice).toBeInTheDocument();
});

test('상품 수량의 최소 및 최대 값에 따른 버튼 비활성화', async () => {
  const { GoodsData, queryClient } = setup();

  render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <OptionSection productId={GoodsData.id.toString()} />
      </MemoryRouter>
    </QueryClientProvider>
  );

  const input = await screen.findByLabelText('수량 입력');
  const decreaseButton = screen.getByLabelText('수량 1개 감소');
  const increaseButton = screen.getByLabelText('수량 1개 추가');

  expect(input).toHaveValue('1');
  expect(decreaseButton).toHaveAttribute('aria-disabled', 'true'); 

  fireEvent.change(input, { target: { value: '100' }});

  expect(input).toHaveValue('100');
  expect(increaseButton).toHaveAttribute('aria-disabled', 'true'); 
});
