import {WebBase} from "./calls/web-base";
import type {InvResponse} from "./responses/inv-response";
import type {InventoryItem} from "../models/inventory-item";

class Inventory extends WebBase {
    public retrieve = this.auth( async (): Promise<Array<InventoryItem>> => {
        const response = await this.get<null, InvResponse>('inventory')
        return response.body
    })

    public update = this.auth(async (inventory: Array<InventoryItem>): Promise<Array<InventoryItem>> => {
        const response =  await this.post<Array<InventoryItem>, InvResponse>('inventory', inventory)
        return response.body
    })
}

export const inventory = new Inventory();
