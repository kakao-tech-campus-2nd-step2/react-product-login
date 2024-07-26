import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { CountOptionItem } from '@/components/features/Goods/Detail/OptionItem/CountOptionItem'; // 경로를 필요에 따라 조정하세요.

const handleChange = jest.fn();

describe('CountOptionItem 컴포넌트', () => {
  test('올바르게 렌더링됩니다.', () => {
    render(
      <CountOptionItem 
        name="테스트 카운트" 
        minValues={0} 
        maxValues={10} 
        value="5"
        onChange={handleChange} 
      />
    );

    // 제목이 올바르게 렌더링되는지 확인합니다.
    expect(screen.getByText('테스트 카운트')).toBeInTheDocument();

    expect(screen.getByDisplayValue('5')).toBeInTheDocument();

    // 증가 및 감소 버튼이 렌더링되는지 확인합니다.
    expect(screen.getByLabelText('수량 1개 감소')).toBeInTheDocument();
    expect(screen.getByLabelText('수량 1개 추가')).toBeInTheDocument();
  });

  test('값을 올바르게 증가시킵니다.', () => {
    render(
      <CountOptionItem 
        name="테스트 카운트" 
        minValues={0} 
        maxValues={10} 
        value="5"
        onChange={handleChange} 
      />
    );

    // 증가 버튼을 찾아 클릭합니다.
    const incrementButton = screen.getByLabelText('수량 1개 추가');
    fireEvent.click(incrementButton);

    // handleChange 함수가 올바른 값으로 호출되었는지 확인합니다.
    expect(handleChange).toHaveBeenCalledWith(6);
  });

  test('값을 올바르게 감소시킵니다.', () => {
    render(
      <CountOptionItem 
        name="테스트 카운트" 
        minValues={0} 
        maxValues={10} 
        value="5"
        onChange={handleChange} 
      />
    );

    const decrementButton = screen.getByLabelText('수량 1개 감소');
    fireEvent.click(decrementButton);

    expect(handleChange).toHaveBeenCalledWith(4);
  });

  test('최대 값을 초과하지 않습니다.', () => {
    render(
      <CountOptionItem 
        name="테스트 카운트" 
        minValues={0} 
        maxValues={10} 
        value="10" 
        onChange={handleChange} 
      />
    );

    const incrementButton = screen.getByLabelText('수량 1개 추가');
    fireEvent.click(incrementButton);

    expect(handleChange).not.toHaveBeenCalled();
  });

  test('최소 값보다 감소하지 않습니다.', () => {
    render(
      <CountOptionItem 
        name="테스트 카운트" 
        minValues={0} 
        maxValues={10} 
        value="0"
        onChange={handleChange} 
      />
    );

    const decrementButton = screen.getByLabelText('수량 1개 감소');
    fireEvent.click(decrementButton);

    // handleChange 함수가 호출되지 않았는지 확인합니다.
    expect(handleChange).not.toHaveBeenCalled();
  });
});