import { getDynamicPath } from "./path";

test("dynamicPath function", () => {
    const categoryId = "123";
    expect(getDynamicPath.category(categoryId)).toBe("/category/123");

    const redirect = "http://localhost:3000";
    expect(getDynamicPath.login(redirect)).toBe(`/login?redirect=${encodeURIComponent(redirect)}`);
    expect(getDynamicPath.productsDetail(123)).toBe("/products/123");
})