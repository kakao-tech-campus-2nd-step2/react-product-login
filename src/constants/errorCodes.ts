export enum ErrorCode {
  InvalidRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  ServerError = 500,
}

export const ERROR_MESSAGES: Record<ErrorCode, string> = {
  [ErrorCode.InvalidRequest]: '유효하지 않은 입력입니다.',
  [ErrorCode.Unauthorized]: '권한이 없습니다.',
  [ErrorCode.Forbidden]: '접근이 거부되었습니다.',
  [ErrorCode.NotFound]: '찾을 수 없습니다.',
  [ErrorCode.ServerError]: '서버 오류가 발생했습니다.',
};
