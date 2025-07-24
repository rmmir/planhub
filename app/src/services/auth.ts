import { jwtDecode } from "jwt-decode"

type DecodedToken = {
    sub: string
    email: string
}

export class AuthService {
    private static tokenKey = "access_token"

    static getToken(): string | null {
        return localStorage.getItem(this.tokenKey)
    }

    static decodeToken(): DecodedToken | null {
        const token = this.getToken()
        if (!token) return null

        return jwtDecode<DecodedToken>(token)
    }

    static getUserId(): string | null {
        const decoded = this.decodeToken()
        return decoded?.sub ?? null
    }
}
