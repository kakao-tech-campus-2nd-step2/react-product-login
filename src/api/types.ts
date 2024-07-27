export type RegisterUserRequest = {
  email: string;
  password: string;
};

export type RegisterUserResponse = {
  token: string;
};

export type LoginUserRequest = {
  email: string;
  password: string;
};

export type LoginUserResponse = {
  token: string;
};

export type AddToWishlistResponse = {
  success: boolean;
  message: string;
};
