import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { productsMockHandler } from '@/api/hooks/products.mock';
import { GoodsDetail } from '@/components/features/Goods/Detail';
import { OptionSection } from '@/components/features/Goods/Detail/OptionSection';
import { server } from '@/mocks/server';
import { AuthProvider } from '@/provider/Auth';
server.use(...productsMockHandler);

const productDetail = {
  id: 3245119,
  name: '[단독각인] 피렌체 1221 에디션 오드코롱 50ml (13종 택1)',
  imageUrl:
    'https://st.kakaocdn.net/product/gift/product/20240215083306_8e1db057580145829542463a84971ae3.png',
  price: 145000,
};

const productOptions = {
  id: 1,
  name: 'Option A',
  quantity: 10,
  productId: 1,
};

const queryClient = new QueryClient();

describe('GoodsDetail', () => {
  it('productId가 주어지면, 페이지에 상품 상세 내용을 올바르게 렌더링한다.', async () => {
    // given
    const { id, name, imageUrl, price } = productDetail;

    // when
    render(
      <QueryClientProvider client={queryClient}>
        <GoodsDetail productId={id.toString()} />
      </QueryClientProvider>,
    );

    // then
    const nameElement = await screen.findByText(name);
    const imageElement = screen.getByAltText(name);
    const priceElement = screen.getByText(`${price}원`);

    await waitFor(() => {
      expect(nameElement).toBeInTheDocument();
      expect(imageElement).toBeInTheDocument();
      expect(imageElement).toHaveAttribute('src', imageUrl);
      expect(priceElement).toBeInTheDocument();
    });
  });
});

describe('OptionSection', () => {
  it('productId가 주어지면, OptionSection 컴포넌트를 올바르게 렌더링한다.', async () => {
    // given
    const { id, price } = productDetail;
    const { name: optionName } = productOptions;

    // when
    render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <OptionSection productId={id.toString()} />
          </AuthProvider>
        </QueryClientProvider>
      </MemoryRouter>,
    );

    // Then
    expect(await screen.findByText('총 결제 금액')).toBeInTheDocument();
    expect(screen.getByText(`${price}원`)).toBeInTheDocument();
    expect(screen.getByText(optionName)).toBeInTheDocument();
  });

  it('수량에 따라 총 결제 금액을 올바르게 계산한다', async () => {
    const { id, price } = productDetail;

    // given
    render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <OptionSection productId={id.toString()} />
          </AuthProvider>
        </QueryClientProvider>
      </MemoryRouter>,
    );

    // when
    const value = 2;
    fireEvent.change(screen.getByRole('spinbutton'), { target: { value: value } });

    // then
    await waitFor(() => {
      expect(screen.getByText(`${price * value}원`)).toBeInTheDocument();
    });
  });

  it('로그인되지 않은 경우 "로그인이 필요한 메뉴입니다." 모달 대화 상자가 표시된다', async () => {
    const { id } = productDetail;
    // given
    const confirmSpy = jest.spyOn(window, 'confirm').mockReturnValue(true);

    render(
      <MemoryRouter initialEntries={[`/products/${id}`]}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <OptionSection productId={id.toString()} />
          </AuthProvider>
        </QueryClientProvider>
      </MemoryRouter>,
    );

    // when
    fireEvent.click(screen.getByText('나에게 선물하기'));

    // then
    await waitFor(() => {
      expect(confirmSpy).toHaveBeenCalledWith(
        '로그인이 필요한 메뉴입니다.\n로그인 페이지로 이동하시겠습니까?',
      );
    });

    confirmSpy.mockRestore();
  });
});
