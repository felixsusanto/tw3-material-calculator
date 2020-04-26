import data from "../data/blood-and-wine_armor";
import { processRawData } from "./utils";

export const bwArmor = processRawData(data);

export const bwArmorSelect = bwArmor.map(e => e.name);

const diagramData = [...bwArmor];

export default diagramData;
