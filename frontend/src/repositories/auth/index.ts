import { api } from "@/lib/http-client";
import type { SigninRequest, SignupRequest } from "@/types/api";
import { getToken, setToken } from "@/utils/token";

export class AuthRepository {
  constructor() {}

  async signin(credentials: SigninRequest): Promise<void> {
    await api.post('/auth/signin', credentials).then(res => setToken(res.data.token))
  }

  async signup(data: SignupRequest): Promise<void> {
    await api.post('/auth/signup', data).then(res => setToken(res.data.token))
  }

  isAuthenticated(): boolean {
    return !!getToken()
  }
}