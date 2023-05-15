export interface ToastState {
    title: string;
    body: string;
    status: number;
    type: "ok" | "error" | "hidden";
}