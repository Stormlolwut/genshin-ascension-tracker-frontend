export class Jwt {
    static IsSet (): boolean {
        return localStorage.getItem("token") !== null
    }
    static RemoveToken () {
        localStorage.removeItem("token")
    }
    static SetToken (token: string) {
        localStorage.setItem("token", token)
    }
}
