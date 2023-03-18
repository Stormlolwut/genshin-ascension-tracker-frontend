import type { InventoryItem } from "./inventory-item";

export interface User {
  id: number;
  name: string;
  favorites: Array<number>
  inventory: Array<InventoryItem>
}
