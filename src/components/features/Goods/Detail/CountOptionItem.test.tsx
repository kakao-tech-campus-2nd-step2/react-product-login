// 수량 증가, 감소 버튼 기능 확인(단위 테스트)

import '@testing-library/jest-dom';

import * as ChakraUI from '@chakra-ui/react';
import { fireEvent, render, screen } from '@testing-library/react';

import { CountOptionItem } from '@/components/features/Goods/Detail/OptionItem/CountOptionItem';

jest.mock('@chakra-ui/react', () => {
  const originalModule = jest.requireActual('@chakra-ui/react');
  return {
    ...originalModule,
    useNumberInput: jest.fn(),
  };
});

describe('CountOptionItem Component', () => {
  const mockUseNumberInput = (initialValue: string, min: number, max: number) => {
    let currentValue = initialValue;
    const mockOnChange = jest.fn((newValue: string) => {
      const numValue = Number(newValue);
      if (numValue >= min && numValue <= max) {
        currentValue = newValue;
      }
    });

    (ChakraUI.useNumberInput as jest.MockedFunction<typeof ChakraUI.useNumberInput>).mockReturnValue({
        getInputProps: () => ({
            value: currentValue,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => mockOnChange(e.target.value),
        }),
        getIncrementButtonProps: () => ({
            onClick: () => mockOnChange(String(Number(currentValue) + 1)),
        }),
        getDecrementButtonProps: () => ({
            onClick: () => mockOnChange(String(Number(currentValue) - 1)),
        }),
        value: currentValue,
        valueAsNumber: Number(currentValue),
        isFocused: false,
        isDisabled: undefined,
        isReadOnly: undefined,
        htmlProps: {
            defaultValue: undefined,
            value: undefined
        }
    });

    return { mockOnChange, getCurrentValue: () => currentValue };
  };

  it('increments and decrements value correctly', () => {
    const { mockOnChange, getCurrentValue } = mockUseNumberInput('1', 1, 100);
    
    const { rerender } = render(<CountOptionItem name="Quantity" value="1" onChange={mockOnChange} />);

    const incrementButton = screen.getByLabelText('수량 1개 추가');
    const decrementButton = screen.getByLabelText('수량 1개 감소');

    // Increment
    fireEvent.click(incrementButton);
    expect(mockOnChange).toHaveBeenCalledWith('2');
    rerender(<CountOptionItem name="Quantity" value={getCurrentValue()} onChange={mockOnChange} />);
    expect(screen.getByRole('textbox')).toHaveValue('2');

    // Decrement
    fireEvent.click(decrementButton);
    expect(mockOnChange).toHaveBeenCalledWith('1');
    rerender(<CountOptionItem name="Quantity" value={getCurrentValue()} onChange={mockOnChange} />);
    expect(screen.getByRole('textbox')).toHaveValue('1');
  });

  it('does not decrement below minValues', () => {
    const { mockOnChange, getCurrentValue } = mockUseNumberInput('1', 1, 100);
    
    const { rerender } = render(<CountOptionItem name="Quantity" value="1" onChange={mockOnChange} minValues={1} />);

    const decrementButton = screen.getByLabelText('수량 1개 감소');

    fireEvent.click(decrementButton);
    expect(mockOnChange).toHaveBeenCalledWith('0');
    rerender(<CountOptionItem name="Quantity" value={getCurrentValue()} onChange={mockOnChange} minValues={1} />);
    expect(screen.getByRole('textbox')).toHaveValue('1');
  });

  it('does not increment above maxValues', () => {
    const { mockOnChange, getCurrentValue } = mockUseNumberInput('100', 1, 100);
    
    const { rerender } = render(<CountOptionItem name="Quantity" value="100" onChange={mockOnChange} maxValues={100} />);

    const incrementButton = screen.getByLabelText('수량 1개 추가');

    fireEvent.click(incrementButton);
    expect(mockOnChange).toHaveBeenCalledWith('101');
    rerender(<CountOptionItem name="Quantity" value={getCurrentValue()} onChange={mockOnChange} maxValues={100} />);
    expect(screen.getByRole('textbox')).toHaveValue('100');
  });

  it('updates value when input changes', () => {
    const { mockOnChange, getCurrentValue } = mockUseNumberInput('1', 1, 100);
    
    const { rerender } = render(<CountOptionItem name="Quantity" value="1" onChange={mockOnChange} />);

    const input = screen.getByRole('textbox');

    fireEvent.change(input, { target: { value: '50' } });
    expect(mockOnChange).toHaveBeenCalledWith('50');
    rerender(<CountOptionItem name="Quantity" value={getCurrentValue()} onChange={mockOnChange} />);
    expect(screen.getByRole('textbox')).toHaveValue('50');
  });
});