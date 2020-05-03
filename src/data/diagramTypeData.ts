export interface RequiredItem {
  name: string;
  qty: number;
}

export interface Diagram {
  name: string;
  img: string;
  req: RequiredItem[];
}
