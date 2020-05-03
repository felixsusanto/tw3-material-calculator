import data from "../csv/bwArmor.csv";
import { processCsv } from "./utils";

export const bwArmor = processCsv(data);

export const bwArmorSelect = bwArmor.map(e => e.name);

const diagramData = [...bwArmor];

export default diagramData;
