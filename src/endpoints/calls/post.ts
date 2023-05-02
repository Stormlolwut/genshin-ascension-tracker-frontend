export interface Post {
    post<P, R>(path: string, params: P) : Promise<R>
}
