const papa = require('papaparse');
const rawdata = require('./data');
const _ = require('lodash');
const fs = require('fs');

const {bwArmor, ...theData} = rawdata;

const arrayProcessor = () => {
  Object.keys(theData)
    .forEach(key => {
      const res = theData[key]
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
};

const objProcessor = () => {
  const arr = _.values(bwArmor);
  const data = arr.map((obj) => {
    const {name, components: requiredItem, img} = obj;
    return {
      name: name.toUpperCase().replace(/\s+/g, '_'),
      img: img.replace(/window[^?]+/g, ''),
      requiredItem: requiredItem.replace(/(\d+x\s+)(.+)/gm, (_,b,c) => {
        return `${b}${c.toUpperCase().replace(/\s+/g, '_')}`; 
     })
    }
  });
  console.log(data);
  fs.writeFileSync(`./data-processing/output/bwArmor.csv`, papa.unparse(data));
}

objProcessor();