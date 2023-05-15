import {WebBase} from "./calls/web-base";
import type {InvResponse} from "./responses/inv-response";
import type {InventoryItem} from "../models/inventory-item";

class Inventory extends WebBase {
    public retrieve = this.auth( async (): Promise<InvResponse> => {
        return this.get<null, InvResponse>('inventory')
    })

    // This is a special case where we want to return the body of the response
    public retrieveBody = this.auth( async (): Promise<Array<InventoryItem>> => {
        return (await this.retrieve()).body
    })

    public update = this.auth(async (inventory: Array<InventoryItem>): Promise<InvResponse> => {
        return this.post<Array<InventoryItem>, InvResponse>('inventory', inventory)
    })
}

export const inventory = new Inventory();
