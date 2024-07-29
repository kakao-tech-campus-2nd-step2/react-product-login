import { HttpResponse, HttpResponseResolver, http } from 'msw';

import { LoginRequestBody, LoginResponse } from '@/api/services/auth/login';
import {
  RegisterRequestBody,
  RegisterResposne,
} from '@/api/services/auth/register';
import { getLoginPath, getRegisterPath } from '@/api/services/path';

function handleLoginRequest(
  resolver: HttpResponseResolver<never, LoginRequestBody, LoginResponse>
) {
  return http.post(getLoginPath(), resolver);
}

function handlRegisterRequest(
  resolver: HttpResponseResolver<never, RegisterRequestBody, RegisterResposne>
) {
  return http.post(getRegisterPath(), resolver);
}

export const authMockHandler = [
  handleLoginRequest(async ({ request }) => {
    const data = await request.json();

    return HttpResponse.json({
      email: data.email,
      token: `mocked_token_${data.email}`,
    });
  }),
  handlRegisterRequest(async ({ request }) => {
    const data = await request.json();

    return HttpResponse.json({
      email: data.email,
      token: `mocked_token_${data.email}`,
    });
  }),
];
