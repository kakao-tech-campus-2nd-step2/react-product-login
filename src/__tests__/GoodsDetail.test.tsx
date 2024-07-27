import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { act } from "react";
import { MemoryRouter } from "react-router-dom";

import { GoodsDetailHeader } from "@/components/features/Goods/Detail/Header";
import { OptionSection } from "@/components/features/Goods/Detail/OptionSection";

const queryClient = new QueryClient();

const renderWithProviders = (element: React.ReactElement) => {
  return render(
    <ChakraProvider>
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>{element}</QueryClientProvider>
      </MemoryRouter>
    </ChakraProvider>,
  );
};

const productData = {
  id: 3245119,
  name: "[단독각인] 피렌체 1221 에디션 오드코롱 50ml (13종 택1)",
  imageUrl:
    "https://st.kakaocdn.net/product/gift/product/20240215083306_8e1db057580145829542463a84971ae3.png",
  price: 145000,
};

describe("GoodsDetail Page", () => {
  describe("GoodsDetailHeader", () => {
    test("Rendering", async () => {
      renderWithProviders(<GoodsDetailHeader productId={productData.id.toString()} />);

      await waitFor(() => {
        expect(screen.getByAltText(productData.name)).toBeInTheDocument(); // Img
        expect(screen.getByText(productData.name)).toBeInTheDocument(); // product name
        expect(screen.getByText(`${productData.price}원`)).toBeInTheDocument(); // price
      });
    });
  });
  describe("OptionSection", () => {
    beforeEach(async () => {
      await act(async () => {
        renderWithProviders(<OptionSection productId={productData.id.toString()} />);
      });
    });

    test("Rendering", async () => {
      await waitFor(() => {
        expect(screen.getByRole("spinbutton")).toBeInTheDocument();
        expect(screen.getByLabelText("수량 1개 감소")).toBeInTheDocument();
        expect(screen.getByLabelText("수량 1개 추가")).toBeInTheDocument();
        expect(screen.getByText("총 결제 금액")).toBeInTheDocument();
        expect(screen.getByText("나에게 선물하기")).toBeInTheDocument();
      });
    });

    test("수량 입력", async () => {
      const spinbutton = screen.getByRole("spinbutton") as HTMLInputElement;
      fireEvent.change(spinbutton, { target: { value: "3" } });
      expect(spinbutton.value).toBe("3");
    });

    test("총 결제 금액", () => {
      const spinbutton = screen.getByRole("spinbutton") as HTMLInputElement;
      expect(screen.getByText(`${productData.price}원`));

      fireEvent.change(spinbutton, { target: { value: "3" } });
      expect(screen.getByText(`${productData.price * 3}원`));
    });
  });
});
