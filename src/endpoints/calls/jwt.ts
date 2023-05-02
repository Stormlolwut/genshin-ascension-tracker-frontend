export class Jwt {
    static IsSet (): boolean {
        return localStorage.getItem("token") !== null
    }
    static GetToken(): string | null {
        return localStorage.getItem("token")
    }
    static SetToken (token: string) {
        localStorage.setItem("token", token)
    }
}
