const papa = require('papaparse');
const rawdata = require('./data');
const fs = require('fs');

Object.keys(rawdata)
  .forEach(key => {
    const res = rawdata[key]
      .map((arr) => {
        const [name, img, reqArr ] = arr;
        const requiredItem = reqArr.map((elm) => {
          const [name, _, qty] = elm;
          return `${qty}x ${name}`;
        });
        return {
          name,
          img,
          requiredItem: requiredItem.join('\n')
        };
      })
    ;
    fs.writeFileSync(`./data-processing/output/${key}.csv`, papa.unparse(res));
  });
