import { ChakraProvider } from '@chakra-ui/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FormProvider, useForm } from 'react-hook-form';

import { MessageCardFields } from '../components/features/Order/OrderForm/Fields/MessageCardFields';

// Mock useOrderFormContext
jest.mock('@/hooks/useOrderFormContext', () => ({
  useOrderFormContext: () => ({
    register: jest.fn(),
  }),
}));

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <ChakraProvider>{children}</ChakraProvider>
    </FormProvider>
  );
};

describe('MessageCardFields', () => {
  it('renders the textarea correctly', () => {
    render(<MessageCardFields />, { wrapper: TestWrapper });

    const textarea = screen.getByPlaceholderText('선물과 함께 보낼 메시지를 적어보세요');
    expect(textarea).toBeInTheDocument();
  });

  it('validates the message text correctly', async () => {
    render(<MessageCardFields />, { wrapper: TestWrapper });

    const textarea = screen.getByPlaceholderText('선물과 함께 보낼 메시지를 적어보세요');
    const submitButton = screen.getByRole('button', { name: /submit/i });

    // Test empty input validation
    userEvent.clear(textarea);
    userEvent.click(submitButton);

    expect(await screen.findByText('Message is required')).toBeInTheDocument();

    // Test input with valid data
    userEvent.type(textarea, 'This is a test message');
    userEvent.click(submitButton);

    expect(await screen.queryByText('Message is required')).not.toBeInTheDocument();
  });
});
