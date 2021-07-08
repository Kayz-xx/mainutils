const weky = require("weky")

module.exports = {
    name: "slots",
    category: "fun",
  
    description: "A game of classic slots!",
    async execute(client, message, cmd,  args) {
var slot = new weky.Slots({
    message: message,
    winMessage: "Nice, You've won the slots!",
    loseMessage: "Better luck next time",
    emojiOne: "👑",
    emojiTwo: "🏆",
    emojiThree: "🎟️"
})

slot.start()
    }
}