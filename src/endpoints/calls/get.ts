export interface Get {
    get<P, R>(path: string, params?: P) : Promise<R>
}
