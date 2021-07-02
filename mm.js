const array = require('./profiles.json')
const filteredArray= array.filter(key => key.coins > 0)

console.log(filteredArray)
    