import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen } from "@testing-library/react";
import { FormProvider, useForm } from "react-hook-form";

import { CashReceiptFields } from "@/components/features/Order/OrderForm/Fields/CashReceiptFields";
import { MessageCardFields } from "@/components/features/Order/OrderForm/Fields/MessageCardFields";

const queryClient = new QueryClient();

const OrderWrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm({
    defaultValues: {
      productId: 0,
      productQuantity: 1,
      senderId: 0,
      receiverId: 0,
      hasCashReceipt: false,
      cashReceiptType: "",
      cashReceiptNumber: "",
      messageCardTextMessage: "",
    },
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};

const renderWithOrderWrapper = (element: React.ReactElement) => {
  return render(
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <OrderWrapper>{element}</OrderWrapper>
      </QueryClientProvider>
    </ChakraProvider>,
  );
};

const getCashReciptCheckbox = () => {
  return screen.getByLabelText("현금영수증 신청");
};

const getCashReceiptType = () => {
  return screen.getByRole("combobox");
};

const getCashReceiptNumber = () => {
  return screen.getByPlaceholderText("(-없이) 숫자만 입력해주세요.");
};

const getMessage = () => {
  return screen.getByPlaceholderText("선물과 함께 보낼 메시지를 적어보세요");
};

describe("Order Page", () => {
  describe("CashReceiptFields", () => {
    beforeEach(() => {
      renderWithOrderWrapper(<CashReceiptFields />);
    });
    describe("hasCashReceipt (현금영수증 Checkbox)", () => {
      test("false인 경우 > 현금영수증 종류, 현금영수증 번호 field가 비활성화", () => {
        expect(getCashReciptCheckbox()).not.toBeChecked();
        expect(getCashReceiptType()).toBeDisabled();
        expect(getCashReceiptNumber()).toBeDisabled();
      });

      test("true인 경우 > 현금영수증 종류, 현금영수증 번호 field가 활성화", () => {
        const checkbox = getCashReciptCheckbox();
        fireEvent.click(checkbox);

        expect(checkbox).toBeChecked();
        expect(getCashReceiptType()).toBeEnabled();
        expect(getCashReceiptNumber()).toBeEnabled();
      });
    });

    describe("cashReceiptType (현금영수증 종류)", () => {
      test("값을 선택한 경우 > 입력된 값이 올바르게 반영되는지 확인", () => {
        fireEvent.click(getCashReciptCheckbox());

        const receiptType = getCashReceiptType();
        fireEvent.change(receiptType, { target: { value: "BUSINESS" } });

        expect(receiptType).toHaveValue("BUSINESS");
      });
    });

    describe("cashReceiptNumber (현금영수증 번호)", () => {
      test("번호를 입력한 경우 > 입력된 값이 올바르게 반영되는지 확인", () => {
        fireEvent.click(getCashReciptCheckbox());

        const receiptNumber = getCashReceiptNumber();
        fireEvent.change(receiptNumber, { target: { value: "12345" } });

        expect(receiptNumber).toHaveValue("12345");
      });
    });
  });

  describe("MessageCardFields", () => {
    beforeEach(() => {
      renderWithOrderWrapper(<MessageCardFields />);
    });
    test("메시지 카드에 입력한 경우 > 입력된 값이 올바르게 반영되는지 확인", () => {
      const message = getMessage();
      fireEvent.change(message, { target: { value: "메시지" } });

      expect(message).toHaveValue("메시지");
    });
  });
});
