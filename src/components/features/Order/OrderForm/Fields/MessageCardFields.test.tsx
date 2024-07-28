import { ChakraProvider } from '@chakra-ui/react';
import { fireEvent, render, screen } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';

import { MessageCardFields } from './MessageCardFields'; // 컴포넌트 경로에 맞게 수정

describe('MessageCardFields', () => {
  // 폼 제출 함수 (실제 폼 제출 로직은 생략)
  const handleSubmit = jest.fn();

  const TestComponent = () => {
    const methods = useForm();

    return (
      <ChakraProvider>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(handleSubmit)}>
            <MessageCardFields />
            <button type="submit">제출</button>
          </form>
        </FormProvider>
      </ChakraProvider>
    );
  };

  test('필수 입력 필드 검사', async () => {
    render(<TestComponent />);

    // 1. 폼 제출 시도
    const submitButton = screen.getByText('제출');
    fireEvent.click(submitButton);

    // 2. 에러 메시지 확인
    const errorMessage = await screen.findByText('메시지를 입력해주세요.'); // 실제 에러 메시지에 맞게 수정
    expect(errorMessage).toBeInTheDocument();
  });

  test('입력 값 형식 검사 (최대 길이 초과)', async () => {
    render(<TestComponent />);

    // 1. 텍스트 입력 (최대 길이 초과)
    const textArea = screen.getByPlaceholderText('선물과 함께 보낼 메시지를 적어보세요');
    fireEvent.change(textArea, { target: { value: 'a'.repeat(501) } }); // 최대 길이 가정: 500자

    // 2. 폼 제출 시도
    const submitButton = screen.getByText('제출');
    fireEvent.click(submitButton);

    // 3. 에러 메시지 확인
    const errorMessage = await screen.findByText('메시지는 500자를 넘을 수 없습니다.'); // 실제 에러 메시지에 맞게 수정
    expect(errorMessage).toBeInTheDocument();
  });

  test('정상 입력 검사', async () => {
    render(<TestComponent />);

    // 1. 텍스트 입력 (정상)
    const textArea = screen.getByPlaceholderText('선물과 함께 보낼 메시지를 적어보세요');
    fireEvent.change(textArea, { target: { value: '테스트 메시지' } });

    // 2. 폼 제출
    const submitButton = screen.getByText('제출');
    fireEvent.click(submitButton);

    // 3. 폼 제출 확인 및 값 전달 확인
    expect(handleSubmit).toHaveBeenCalledTimes(1);
    expect(handleSubmit).toHaveBeenCalledWith({
      messageCardTextMessage: '테스트 메시지',
    });
  });
});
