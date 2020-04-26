import _ from "lodash";
import { CraftableItem } from "./typeData";

interface Structure {
  name: string;
  components: string;
  img: string;
}
type RawObject = {
  [key: string]: Structure;
};
type Img = string;
type Name = string;
type Qty = number;

type Output = [Name, Img, [Name, Qty][]];

export const processRawData = (obj: RawObject): CraftableItem[] => {
  const values = _.values(obj);
  const result = values.map((value: Structure) => {
    const arrComponents = value.components.split("\n");
    const compsRequired = arrComponents.map((str: string) => {
      const [qty, name] = str.split("x ");
      return {
        name: name.toUpperCase().replace(/ /g, "_"),
        qty: +qty
      };
    });
    return {
      name: value.name.toUpperCase().replace(/ /g, "_"),
      img: value.img.replace(/\/window[^?]+/g, ""),
      req: compsRequired
    };
  });
  console.log(result);
  return result;
};
