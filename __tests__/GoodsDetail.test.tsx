import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/provider/Auth';
import { OptionSection } from '@/components/features/Goods/Detail/OptionSection';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

jest.mock('@/provider/Auth');
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('OptionSection', () => {
  const mockNavigate = jest.fn();
  const mockUseAuth = jest.fn();
  const queryClient = new QueryClient();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useAuth as jest.Mock).mockReturnValue(mockUseAuth);

    window.confirm = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('로그인 안했을 시 나에게 선물하기 버튼을 누르면 로그인 창이 뜨는지', async () => {
    (window.confirm as jest.Mock).mockImplementation(() => true);
    render(
      <QueryClientProvider client={queryClient}>
        <OptionSection productId="3245119" />
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText('나에게 선물하기')).toBeInTheDocument();
    });

    const giftButton = screen.getByText('나에게 선물하기');
    fireEvent.click(giftButton);

    expect(window.confirm).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });
});
