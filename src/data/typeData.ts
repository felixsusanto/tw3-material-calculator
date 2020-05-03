export interface RequiredItem {
  name: string;
  qty: number;
}

export interface CraftableItem {
  name: string;
  img: string;
  req: RequiredItem[];
}
