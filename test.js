const moment = require('moment')

const getItems = count =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k}`,
    content: `item ${k}`
  }));

  const newThing = getItems(10);
  console.log(newThing);

console.log(new Date().getDay())