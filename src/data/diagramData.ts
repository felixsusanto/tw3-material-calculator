import data from "../csv/bwArmor.csv";
import { processCsv, extractName } from "./utils";

export const bwArmor = processCsv(data);

export const bwArmorSelect = bwArmor.map(extractName);

const diagramData = [...bwArmor];

export default diagramData;
