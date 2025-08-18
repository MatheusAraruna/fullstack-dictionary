import { config } from "../config"
import Cookies from 'js-cookie'

export function getToken(): string | null {
    const cookie = Cookies.get(config.auth.cookie_name)
    if(!cookie) {
        return null
    }
    return cookie
}


export function setToken(token: string): void {
    Cookies.set(
        config.auth.cookie_name, 
        token, 
        { 
            path: '/', 
            sameSite: 'lax', 
            expires: config.auth.expiresInDays 
        })
}

export function signout(): void {
    Cookies.remove(config.auth.cookie_name, { path: '/' })
}

export function isAuthenticated(): boolean {
    return !!getToken()
}