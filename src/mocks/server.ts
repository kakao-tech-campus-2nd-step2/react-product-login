import { setupServer } from "msw/node";

import { categoriesMockHandler } from "@/api/hooks/categories.mock";
import { productsMockHandler } from "@/api/hooks/products.mock";


export const server = setupServer(
  ...categoriesMockHandler, 
  ...productsMockHandler
)

// https://velog.io/@bbaa3218/MSW%EB%A1%9C-Mocking-%ED%95%98%EA%B8%B0 참고한 사이트