export interface LevelData {
    type: 'Attack' | 'Burst' | 'Skill' | 'Talent'
    current: number
    preferred: number
}

export class Level {
    public type: 'Attack' | 'Burst' | 'Skill' | 'Talent'
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