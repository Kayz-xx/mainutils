const weky = require("weky")

module.exports = {
    name: "slots",
    category: "fun",
  
    description: "A game of classic slots!",
    async execute(client, message, cmd,  args) {
var slot = new weky.Slots({
    message: message,
    winMessage: "Nice, You've gained 10 lotto points",
    loseMessage: "Better luck next time, lost 5 lotto points",
    emojiOne: "👑",
    emojiTwo: "🏆",
    emojiThree: "🎟️"
})

slot.start()
    }
}
