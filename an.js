const array = require('./total.json')

let total = 0

Promise.all(array.map(a=> total = parseInt(total.toString().replace(",",'')) + parseInt(a.amount.toString().replace(",",''))))

console.log(total)