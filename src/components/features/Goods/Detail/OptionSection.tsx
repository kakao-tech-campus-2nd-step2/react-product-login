import styled from "@emotion/styled";
import { AxiosError } from "axios";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  type ProductDetailRequestParams,
  useGetProductDetail,
} from "@/api/hooks/useGetProductDetail";
import { useGetProductOptions } from "@/api/hooks/useGetProductOptions";
import { useAddWish } from "@/api/hooks/useWish";
import { Button } from "@/components/common/Button";
import { Spacing } from "@/components/common/layouts/Spacing";
import { useAuth } from "@/provider/Auth";
import { getDynamicPath, RouterPath } from "@/routes/path";
import { orderHistorySessionStorage } from "@/utils/storage";

import { CountOptionItem } from "./OptionItem/CountOptionItem";

type Props = ProductDetailRequestParams;

export const OptionSection = ({ productId }: Props) => {
  const { data: detail } = useGetProductDetail({ productId });
  const { data: options } = useGetProductOptions({ productId });

  const [countAsString, setCountAsString] = useState("1");
  const totalPrice = useMemo(() => {
    return detail.price * Number(countAsString);
  }, [detail, countAsString]);

  const navigate = useNavigate();
  const authInfo = useAuth();

  const { mutate: addWish } = useAddWish(productId);

  const handleClick = () => {
    if (!authInfo) {
      const isConfirm = window.confirm(
        "로그인이 필요한 메뉴입니다.\n로그인 페이지로 이동하시겠습니까?",
      );

      if (!isConfirm) return;
      return navigate(getDynamicPath.login());
    }

    orderHistorySessionStorage.set({
      id: parseInt(productId),
      count: parseInt(countAsString),
    });

    navigate(RouterPath.order);
  };

  const handleWish = () => {
    if (!authInfo) {
      const isConfirm = window.confirm(
        "로그인이 필요한 메뉴입니다.\n로그인 페이지로 이동하시겠습니까?",
      );

      if (!isConfirm) return;
      return navigate(getDynamicPath.login());
    }

    const handleError = (error: Error) => {
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data?.error || error.message;
        alert(`위시리스트 추가에 실패했습니다: ${errorMessage}`);
      } else {
        alert(`위시리스트 추가에 실패했습니다: ${error.message}`);
      }
    };

    addWish(
      { productId: parseInt(productId) },
      {
        onSuccess: () => {
          alert("상품이 위시리스트에 추가되었습니다.");
        },
        onError: (error) => {
          handleError(error);
        },
      },
    );
  };

  return (
    <Wrapper>
      <CountOptionItem name={options[0].name} value={countAsString} onChange={setCountAsString} />
      <BottomWrapper>
        <PricingWrapper>
          총 결제 금액 <span>{totalPrice}원</span>
        </PricingWrapper>
        <Button theme="black" size="large" onClick={handleClick}>
          나에게 선물하기
        </Button>
        <Spacing
          height={{
            initial: 10,
            sm: 15,
          }}
        />
        <Button theme="lightGray" size="large" onClick={handleWish}>
          관심 등록
        </Button>
      </BottomWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  padding: 30px 12px 30px 30px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const BottomWrapper = styled.div`
  padding: 12px 0 0;
`;

const PricingWrapper = styled.div`
  margin-bottom: 20px;
  padding: 18px 20px;
  border-radius: 4px;
  background-color: #f5f5f5;
  display: flex;
  justify-content: space-between;

  font-size: 14px;
  font-weight: 700;
  line-height: 14px;
  color: #111;

  & span {
    font-size: 20px;
    letter-spacing: -0.02em;
  }
`;
