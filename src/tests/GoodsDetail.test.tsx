import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { server } from '../mocks/browser';

import { GoodsDetail } from '@/components/features/Goods/Detail';
import { OptionSection } from '@/components/features/Goods/Detail/OptionSection';

const queryClient = new QueryClient();

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>{ui}</BrowserRouter>
      </QueryClientProvider>
    </ChakraProvider>,
  );
};

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

test('상세 정보 렌더링 확인', async () => {
  renderWithProviders(<GoodsDetail productId="1" />);

  await waitFor(() => {
    expect(
      screen.getByAltText('[단독각인] 피렌체 1221 에디션 오드코롱 50ml (13종 택1)'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('[단독각인] 피렌체 1221 에디션 오드코롱 50ml (13종 택1)'),
    ).toBeInTheDocument();
    expect(screen.getByText('145000원')).toBeInTheDocument();
  });
});

test('OptionSection 렌더링 확인', async () => {
  renderWithProviders(<OptionSection productId="1" />);

  await waitFor(() => {
    expect(screen.getByRole('spinbutton')).toBeInTheDocument();
    expect(screen.getByLabelText('-')).toBeInTheDocument();
    expect(screen.getByLabelText('+')).toBeInTheDocument();
    expect(screen.getByText('총 결제금액')).toBeInTheDocument();
  });
});
