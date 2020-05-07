declare module '*.csv';

interface FieldsObject {
  dimension1?: string; // 
  metric1?: number;
};

interface EventParameters {
  event_category?: string;
  event_label?: string;
  transport_type?: string;
  value?: number;
  custom_value?: any;
  event_callback?: () => void;
}

type GA = (send: 'send',
    event: 'event',
    eventCategory: string,
    eventAction: string,
    eventLabel?: string,
    eventValue?: number,
    fieldsObject?: FieldsObject
  ) => void
;

type GTag = (
  event: 'event',
  eventAction: string,
  eventParamters: EventParameters
) => void;
// declare const ga: undefined | GA;

interface Window {
  ga?: GA;
  gtag?: GTag;
}