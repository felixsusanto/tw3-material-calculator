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

export const extractName = (arg: CraftableItem) => {
  return arg.name;
};


export const processCsv = (csv: string): CraftableItem[] => {
  const res = Papa.parse(csv, { header: true });
  const result = res.data.map(processCsv_result);
  return result;
};

export const processCsv_result = (obj: RawCsv) => {
  const {name, img, requiredItem} = obj;
  const req: Req[] = requiredItem.split('\n')
    .map(processCsv_req)
  ;
  return {
    name: name.trim(),
    img,
    req
  };
};

export const processCsv_req = (str: string) => {
  const [qty, name] = str.split('x ');
  return {
    qty: +qty,
    name: name.trim()
  }
};