import setupMockBeforeTest from '@utils/testUtil';
import {
  describe, expect, it, vi,
} from 'vitest';
import {
  render,
  screen,
} from '@testing-library/react';
import { RouterWrapper } from '@utils/testUtil/TestWrapper';
import ProductCounterForm from '@components/organisms/product/ProductCounterForm';
// eslint-disable-next-line import/no-extraneous-dependencies
import fireEvent from '@testing-library/user-event';

describe('Product details page', () => {
  setupMockBeforeTest();
  const mockProductData = {
    id: 3245119,
    name: '[테스트] 상품이름',
    imageUrl:
      'https://st.kakaocdn.net/product/gift/product/20240215083306_8e1db057580145829542463a84971ae3.png',
    price: 145000,
  };
  const renderComponent = () => render(
    <RouterWrapper>
      <ProductCounterForm
        productId={mockProductData.id}
        productName={mockProductData.name}
        productPrice={mockProductData.price}
      />
    </RouterWrapper>,
  );
  it('Product details should be rendered properly', async () => {
    renderComponent();
    expect(screen.getByText('나에게 선물하기')).toBeInTheDocument();
    expect(screen.getByText(mockProductData.name)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(mockProductData.price.toString()))).toBeInTheDocument();
  });
  it('Count should be changed when the plus button is clicked', async () => {
    renderComponent();
    expect(screen.getByText('+')).toBeInTheDocument();
    await fireEvent.click(screen.getByText('+'));
    expect(screen.getByDisplayValue(2)).toBeInTheDocument();
    await fireEvent.click(screen.getByText('-'));
    expect(screen.getByDisplayValue(1)).toBeInTheDocument();
  });
  it('Confirm dialog should be displayed when the login status is false', async () => {
    const confirmSpy = vi.spyOn(window, 'confirm').mockImplementation(() => true);
    renderComponent();
    const button = screen.getByText('나에게 선물하기');
    expect(button).toBeInTheDocument();
    await fireEvent.click(button);
    expect(confirmSpy).toHaveBeenCalled();
  });
});
