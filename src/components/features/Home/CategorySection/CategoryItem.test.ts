import { render } from "@testing-library/react";
import React from "react";

import { CategoryItem } from "./CategoryItem";

test("CategoryItem component renders correctly", () => {
    const { getByText } = render(React.createElement(CategoryItem, {
        image: "image",
        label: "label"
    }));
    expect(getByText("label")).toBeInTheDocument();
});