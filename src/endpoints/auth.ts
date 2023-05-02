import {WebBase} from "./calls/web-base";
import type {AuthResponse} from "./responses/auth-response";
import {Jwt} from "./calls/jwt";

class Auth extends WebBase {

    public Register = async (username: string, password: string) => {
        const params = {
            username: username,
            password: password
        }

        const response = await this.post<{username: string, password: string} , AuthResponse>('register', params)
        Jwt.SetToken(response.body)

        return response
    }
    public Login = async (username: string, password: string) => {
        const params = {
            username: username,
            password: password
        }

        const response = await this.post<{username: string, password: string} , AuthResponse>('login', params)
        Jwt.SetToken(response.body)

        return response
    }
}

export const auth = new Auth()
