import { HttpResponse, HttpResponseResolver, http } from 'msw';

import { LoginRequestBody, LoginResposne } from '@/api/services/auth/login';
import { getLoginPath } from '@/api/services/path';

type SdkRequest = LoginRequestBody;
type SdkResponse = LoginResposne;

function handleSdkRequest(
  resolver: HttpResponseResolver<never, SdkRequest, SdkResponse>
) {
  return http.post(getLoginPath(), resolver);
}

export const authMockHandler = [
  handleSdkRequest(async ({ request }) => {
    const data = await request.json();

    return HttpResponse.json({
      email: data.email,
      token: `mocked_token_${data.email}`,
    });
  }),
];
