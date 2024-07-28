import React from 'react';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { ROUTE_PATH } from '@routes/path';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '@context/auth/useAuth';
import { Button } from '@components/common';
import QuantitySelector from './QuantitySelector';

interface ProductOrderProps {
  name?: string;
  giftOrderLimit?: number;
}

export interface QuantityValues {
  count: number;
}

export default function ProductOrder({ name, giftOrderLimit }: ProductOrderProps) {
  const { watch, setValue } = useForm<QuantityValues>({
    defaultValues: {
      count: 1,
    },
  });
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { productId } = useParams<{ productId: string }>();

  const handleOrderClick = () => {
    const data = { count: watch('count') };
    if (productId) {
      const orderHistory = { id: Number(productId), count: data.count };
      sessionStorage.setItem('orderHistory', JSON.stringify(orderHistory));
      const targetPath = isAuthenticated ? ROUTE_PATH.ORDER : ROUTE_PATH.LOGIN;
      navigate(targetPath);
    }
  };

  return (
    <ProductOrderContainer>
      <QuantitySelectorContainer>
        <Title data-testid="option-name">{name}</Title>
        <QuantitySelector giftOrderLimit={giftOrderLimit} setValue={setValue} />
      </QuantitySelectorContainer>
      <div>
        <TotalAmount>
          <dl>
            <dt>총 결제 금액</dt>
            <dd>145000원</dd>
          </dl>
        </TotalAmount>
        <Button theme="darkGray" onClick={handleOrderClick}>
          나에게 선물하기
        </Button>
      </div>
    </ProductOrderContainer>
  );
}

const ProductOrderContainer = styled.aside`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 360px;
`;

const QuantitySelectorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 14px 16px;
  border: 1px solid rgb(237, 237, 237);
  border-radius: 2px;
`;

const Title = styled.p`
  font-weight: 700;
  margin-bottom: 12px;
`;

const TotalAmount = styled.div`
  padding: 18px 20px;
  border-radius: 4px;
  background-color: rgb(245, 245, 245);
  margin-bottom: 20px;

  dl {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 700;
  }

  dt {
    font-size: 14px;
  }

  dd {
    font-size: 20px;
  }
`;
