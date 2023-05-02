import type { Response } from './response'
export interface FavResponse extends Response {
    body: Array<number>
}
