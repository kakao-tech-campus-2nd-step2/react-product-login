import { HttpResponse, HttpResponseResolver, http } from 'msw';

import { getWishPath } from '@/api/services/path';
import { WishRequestBody, WishResponse } from '@/api/services/wish';

function handleAddWishRequest(
  resolver: HttpResponseResolver<never, WishRequestBody, WishResponse>
) {
  return http.post(getWishPath(), resolver);
}

let id = 1;
export const wishMockHandler = [
  handleAddWishRequest(async ({ request }) => {
    const data = await request.json();

    const response: WishResponse = {
      id,
      productId: data.productId,
    };

    id += 1;

    return HttpResponse.json(response);
  }),
];
