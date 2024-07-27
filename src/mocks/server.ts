import { setupServer } from "msw/node";

import { categoriesMockHandler } from "@/api/hooks/categories.mock";
import { memberMockHandler } from "@/api/hooks/memeber.mock";
import { productsMockHandler } from "@/api/hooks/products.mock";
import { wishlistMockHandler } from "@/api/hooks/wish.mock";

export const server = setupServer(
  ...categoriesMockHandler,
  ...productsMockHandler,
  ...memberMockHandler,
  ...wishlistMockHandler,
);
