import { useState } from 'react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { IconButton, Input, useNumberInput } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { BASE_URL } from '@/api/instance';
import { authSessionStorage } from '@/utils/storage';

type Props = {
  name: string;
  productId: number;
  minValues?: number;
  maxValues?: number;
  value: string;
  onChange: (value: string) => void;
};

export const CountOptionItem = ({
  name,
  productId,
  minValues = 1,
  maxValues = 100,
  value,
  onChange,
}: Props) => {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } = useNumberInput({
    step: 1,
    min: minValues,
    max: maxValues,
    defaultValue: value,
    onChange: (valueAsString) => {
      onChange(valueAsString);
    },
  });
  const [isChecked, setIsChecked] = useState(false);

  const increment = getIncrementButtonProps();
  const decrement = getDecrementButtonProps();
  const input = getInputProps();

  const wishhandler = async () => {
    setIsChecked((prev) => !prev);
    try {
      const response = await fetch(`${BASE_URL}/api/wishes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authSessionStorage.get()}`,
        },
        body: JSON.stringify({ productId }),
      });
      if (response.status === 201) {
        alert('관심 등록 완료');
      } else {
        alert('관심 등록 실패');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('관심 등록 중 오류가 발생했습니다.');
    }
  };

  return (
    <Wrapper>
      <div style={{ display: 'flex' }}>
        <Title>{name}</Title>
        <div className="icons-list">
          {isChecked ? (
            <HeartFilled
              style={{ color: 'red', fontSize: '20px', outline: 'none' }}
              onClick={wishhandler}
            />
          ) : (
            <HeartOutlined style={{ fontSize: '20px', outline: 'none' }} onClick={wishhandler} />
          )}
        </div>
      </div>
      <InputWrapper>
        <IconButton {...decrement} aria-label="수량 1개 감소" icon={<MinusIcon />} />
        <Input {...input} />
        <IconButton {...increment} aria-label="수량 1개 추가" icon={<AddIcon />} />
      </InputWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  padding: 12px 14px 16px;
  border: 1px solid #ededed;
  border-radius: 2px;
`;

const Title = styled.p`
  font-weight: 700;
  line-height: 22px;
  color: #111;
  word-wrap: break-word;
  word-break: break-all;
  margin-right: 10px;
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 8px;
  gap: 8px;
`;
