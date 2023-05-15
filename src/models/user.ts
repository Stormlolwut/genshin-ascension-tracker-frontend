import type { InventoryItem } from "./inventory-item";
import type {CharacterStats} from "./character-stats";

export interface User {
  id: number
  name: string
  favorites: Array<CharacterStats>
  inventory: Array<InventoryItem>
}
