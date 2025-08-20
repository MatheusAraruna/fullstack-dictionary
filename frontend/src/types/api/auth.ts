import type { AuthUser } from "../entities";

// Request Types
export interface SigninRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
}

// Response Types
export interface SigninResponse extends AuthUser {
  token: string;
}

export interface SignupResponse extends AuthUser {
  token: string;
}
