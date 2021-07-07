const array = require('./profiles.json')

let total = 0

Promise.all(array.map(a=> total = parseInt(total.toString()) + parseInt(a.coins.toString())))

console.log(total)