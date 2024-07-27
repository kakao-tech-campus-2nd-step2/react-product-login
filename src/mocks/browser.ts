import { setupWorker } from "msw";

import { categoriesMockHandler } from "@/api/hooks/categories.mock";
import { memberMockHandler } from "@/api/hooks/memeber.mock";
import { productsMockHandler } from "@/api/hooks/products.mock";

export const worker = setupWorker(
  ...categoriesMockHandler,
  ...productsMockHandler,
  ...memberMockHandler,
);
