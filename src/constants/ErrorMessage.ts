import { StatusCodes } from 'http-status-codes';

export const ERROR_NOT_DEFINED = 0;

export const ErrorMessages: { [key: number]: string } = {
  [StatusCodes.NOT_FOUND]: '서버에서 데이터를 찾을 수 없습니다.',
  [StatusCodes.INTERNAL_SERVER_ERROR]: '서버에서 에러가 발생했습니다.',
  [StatusCodes.BAD_REQUEST]: '서버에서 에러가 발생했습니다: 잘못된 요청!',
  [StatusCodes.UNAUTHORIZED]: '권한이 없습니다.',
  [ERROR_NOT_DEFINED]: '서버에서 데이터를 불러오는 중 오류가 발생했습니다.',
};
