import {WebBase} from "./calls/web-base";
import type {FavResponse} from "./responses/fav-response";
import type {CharacterStats} from "../models/character-stats";

export class Favorites extends WebBase {
    public update = this.auth(async (favorites: Array<CharacterStats>): Promise<FavResponse> => {
        return await this.post<Array<CharacterStats>, FavResponse>("favorites", favorites)
    })

    public retrieve = this.auth(async (): Promise<FavResponse> => {
        return await this.get<Array<CharacterStats>, FavResponse>("favorites")
    })
}

export const favorites = new Favorites();
