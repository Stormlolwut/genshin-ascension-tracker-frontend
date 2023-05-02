import type {InventoryItem} from "../../models/inventory-item";
import type {Response} from "./response";
export interface InvResponse extends Response {
    body: Array<InventoryItem>
}
