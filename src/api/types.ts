export type RegisterUserRequest = {
  email: string;
  password: string;
};

export type RegisterUserResponse = {
  token: string;
};
