const array = require('./profiles.json')
const filteredArray= array.filter(key => key.coins >= 250000000)
const newarr = filteredArray.sort((a, b) => b.coins - a.coins)
console.log(newarr)
    