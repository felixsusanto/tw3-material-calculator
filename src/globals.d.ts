declare module '*.csv';

interface FieldsObject {
  dimension1?: string; // 
  metric1?: number;
};

type GA = {
  send: (send: 'send',
    event: 'event',
    eventCategory: string,
    eventAction: string,
    eventLabel?: string,
    eventValue?: number,
    fieldsObject?: FieldsObject
  ) => void;
}
// declare const ga: undefined | GA;

interface Window {
  ga?: GA;
}