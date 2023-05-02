import {WebBase} from "./calls/web-base";
import type {FavResponse} from "./responses/fav-response";

export class Favorites extends WebBase {
    public update = this.auth(async (favorites: Array<number>): Promise<FavResponse> => {
        return await this.post<Array<number>, FavResponse>("favorites", favorites)
    })

    public retrieve = this.auth(async (): Promise<FavResponse> => {
        return await this.get<Array<number>, FavResponse>("favorites")
    })
}

export const favorites = new Favorites();
