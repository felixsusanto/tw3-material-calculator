import { CraftableItem } from "./typeData";
import _ from 'lodash';
import diagramData from './diagramData';
import { processCsv, extractName } from './utils';
import bnwCompCsv from '../csv/bwComponents.csv';
import vanillaCompCsv from '../csv/vanillaComponents.csv';

const vanillaComponents = processCsv(vanillaCompCsv);
const bwComponents = processCsv(bnwCompCsv);

export const craftableComponents = _.uniq(vanillaComponents.map(extractName));
export const bwCraftableComponents = _.uniq(bwComponents.map(extractName));

const data: CraftableItem[] = [
  ...vanillaComponents,
  ...bwComponents,
  ...diagramData
];

export default data;