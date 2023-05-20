import type {Level} from "./level";

export interface CharacterStatsData {
    id: number
    stats: Array<Level>
    talent: Level
}

//TODO: add items
export class CharacterStats {
    public id: number
    public stats: Array<Level>
    public talent: Level

    constructor(data: CharacterStatsData) {
        this.id = data.id
        this.stats = data.stats
        this.talent = data.talent
    }
}

