import { extractName, processCsv_result, processCsv_req } from 'data/utils';

test('extractName', () => {
  const exp = extractName({name: 'name', img: 'img', req: []});
  expect(exp).toBe('name');
});

test('processCsv_result', () => {
  const exp = processCsv_result({name: 'name', img: 'img', requiredItem: '1x something'});
  expect(exp).toEqual({img: "img", name: "name", req: [{name: "something", qty: 1}]});
});

test('processCsv_req', () => {
  const exp = processCsv_req('1x item');
  expect(exp).toEqual({qty: 1, name: 'item'});
});