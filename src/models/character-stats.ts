import {Level} from "./level";

export interface CharacterStatsData {
    id: number

    talent: Level
    attack: Level
    burst: Level
    skill: Level
}

//TODO: add items
export class CharacterStats {
    public id: number
    public talent: Level
    public attack: Level
    public burst: Level
    public skill: Level

    constructor(data: CharacterStatsData) {
        this.id = data.id
        this.talent = new Level(data.talent)
        this.attack = new Level(data.attack)
        this.burst = new Level(data.burst)
        this.skill = new Level(data.skill)
    }
}

