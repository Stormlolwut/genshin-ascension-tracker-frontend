export interface LevelData {
    type: 'attack' | 'burst' | 'skill' | 'talent'
    current: number
    preferred: number
}

export class Level {
    public type: 'attack' | 'burst' | 'skill' | 'talent'
    public current: number
    public preferred: number

    constructor(data: LevelData){
        this.current = data.current
        this.preferred = data.preferred
        this.type = data.type
    }
    public isCompleted(): boolean {
        return this.current >= this.preferred
    }

}