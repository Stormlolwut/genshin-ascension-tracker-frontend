import type { AscensionMaterial } from "./ascension-material";

export interface Character {
   id: number;
   name: string;
   image: string;
   materials: Array<AscensionMaterial>;
}
