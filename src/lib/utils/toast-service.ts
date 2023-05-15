import { toastStore } from '../stores/toast-store'
import type {Response} from "../../endpoints/responses/response";

export const handleAsync = async <T extends Response>(promise: Promise<T>, fallback?: any, showSuccess = false): Promise<any> => {
    try {
        const response: T = await promise;
        console.log(response, showSuccess);

        if (showSuccess) toastStore.showOk("Success", response.message, response.status);
        return response?.body || response;
    } catch (e: any) {
        const body = JSON.parse(e.message);
        toastStore.showError("Error", body.message, body.status);
        return fallback;
    }
}