import type { AuthUser } from '../entities/auth';

// Request Types
export interface SigninRequest {
  email: string;
  password: string;
}

// Response Types
export interface SigninResponse extends AuthUser {
  token: string;
}

