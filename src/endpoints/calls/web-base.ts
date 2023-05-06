import type {Post} from "./post";
import type {Get} from "./get";
import {Jwt} from "./jwt"

export abstract class WebBase implements Get, Post {
    protected endpoint = import.meta.env.VITE_WORKER_ENDPOINT

    auth<T extends any[]>(callback: (...args: T) => any): (...args: T) => any {
        return async (...args: T) => {
            if (!Jwt.IsSet()) {
                throw new Error(JSON.stringify( {
                    body: [],
                    status: 401,
                    message: "Not logged in!"
                }))
            }

            return callback(...args)
        }
    }

    async get<P, R>(path: string, params?: P): Promise<R> {
        const fullPath = `${this.endpoint}/${path}`

        const jwt = localStorage.getItem("token")

        const response = await fetch(fullPath, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${jwt}`
            },
        })

        const json = await response.json()

        if(response.status !== 200) {
            throw new Error(JSON.stringify(json))
        }

        return json as R
    }

    async post<P, R>(path: string, params: P): Promise<R> {
        const fullPath = `${this.endpoint}/${path}`

        const jwt = localStorage.getItem("token")

        const response = await fetch(fullPath, {
            method: "POST",
            body: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${jwt}`
            },
        })

        const json = await response.json()

        if(response.status !== 200) {
            throw new Error(JSON.stringify(json))
        }

        return json as R
    }
}
