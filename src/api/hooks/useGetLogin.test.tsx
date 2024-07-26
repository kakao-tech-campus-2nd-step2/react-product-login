import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook } from '@testing-library/react-hooks';
import type { ReactNode } from 'react'; // ReactNode 타입 import

import { useLogin } from './useGetLogin';

// QueryClient 생성
const queryClient = new QueryClient();

// QueryClientProvider로 useLogin 훅을 감싼 Wrapper 컴포넌트 생성
const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useLogin Hook', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ email: 'test@example.com', token: 'mockToken' }),
      }),
    ) as jest.Mock;
  });
  it('should successfully login with valid credentials', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useLogin(), { wrapper });

    // 로그인 시도
    act(() => {
      result.current.mutate({ email: 'test@example.com', password: 'password123' });
    });

    // useMutation의 상태가 'success'로 바뀔 때까지 기다림
    await waitForNextUpdate();

    // 결과 확인
    expect(result.current.isSuccess).toBe(true);
    expect(result.current.data).toEqual({ email: 'test@example.com', token: 'mockToken' });
  });
});
