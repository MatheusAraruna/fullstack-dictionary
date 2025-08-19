import { api } from "@/lib/http-client";
import type { SigninRequest } from "@/types/api";
import { getToken, setToken } from "@/utils/token";

export class AuthRepository {
  constructor() {}

  async signin(credentials: SigninRequest): Promise<void> {
    await api.post('/auth/signin', credentials).then(res => setToken(res.data.token))
  }

  isAuthenticated(): boolean {
    return !!getToken()
  }
}