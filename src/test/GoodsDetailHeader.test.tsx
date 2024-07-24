import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { useGetProductDetail } from '@/api/hooks/useGetProductDetail';
import { PRODUCTS_MOCK_DATA } from '@/api/hooks/products.mock';
import { GoodsDetailHeader } from '@/components/features/Goods/Detail/Header';

test('id에 따라 그에 맞는 name과 price 반환', () => {
  // Given: 특정 productId에 대한 mock 데이터가 주어졌을 때
  const productId = PRODUCTS_MOCK_DATA.content[0].id.toString();
  const expectedName = PRODUCTS_MOCK_DATA.content[0].name;
  const expectedPrice = PRODUCTS_MOCK_DATA.content[0].price;

  (useGetProductDetail as jest.Mock).mockImplementation(() => ({
    data: PRODUCTS_MOCK_DATA.content.find((product) => product.id.toString() === productId),
  }));

  // When: GoodsDetailHeader 컴포넌트를 렌더링하면
  render(<GoodsDetailHeader productId={productId} />);

  // Then: 올바른 name과 price가 화면에 표시돼야 해요.
  expect(screen.getByText(expectedName)).toBeInTheDocument();
  expect(screen.getByText(`${expectedPrice}원`)).toBeInTheDocument();
});
