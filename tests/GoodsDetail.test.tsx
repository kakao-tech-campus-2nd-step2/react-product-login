import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";

import { GoodsDetail } from "@/components/features/Goods/Detail";

const GoodsData = {
  id: 3245119,
  name: '[단독각인] 피렌체 1221 에디션 오드코롱 50ml (13종 택1)',
  imageUrl: 'https://st.kakaocdn.net/product/gift/product/20240215083306_8e1db057580145829542463a84971ae3.png',
  price: 145000,
};

const queryClient = new QueryClient();

test('상품의 상세 정보를 올바르게 렌더링', async () => {
  render(
    <QueryClientProvider client={queryClient}>
      <GoodsDetail productId={GoodsData.id.toString()} />
    </QueryClientProvider>
  );

  const name = await screen.findByText(GoodsData.name);
  const image = screen.getByAltText(GoodsData.name);
  const price = screen.getByText(`${GoodsData.price}원`);

  await waitFor(() => {
    expect(name).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(price).toBeInTheDocument();
  });
});
