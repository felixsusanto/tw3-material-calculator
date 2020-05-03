import { CraftableItem } from "./typeData";
import Papa from 'papaparse';

type RawCsv = {
  name: string;
  img: string;
  requiredItem: string;
};

type Req = {
  name: string;
  qty: number;
}

export const processCsv = (csv: string): CraftableItem[] => {
  const res = Papa.parse(csv, { header: true });
  const result = res.data.map((obj: RawCsv) => {
    const {name, img, requiredItem} = obj;
    const req: Req[] = requiredItem.split('\n')
      .map((str: string) => {
        const [qty, name] = str.split('x ');
        return {
          qty: +qty,
          name
        }
      })
    ;
    return {
      name,
      img,
      req
    };
  });
  return result;
};
