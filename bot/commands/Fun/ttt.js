
module.exports = {
  name: 'ttt',
  aliases: ['tictactoe'],
  cooldown: '10',
  permissions: [],
  category: 'Misc',
  
  async execute(client, message, cmd,  args) {

    const opponent = message.mentions.users.first();

    if (!opponent) return message.channel.send(`Please mention who you want to challenge at tictactoe.`);
    if(opponent.bot) return message.channel.send(`You can not play with bots.`);
    const { TicTacToe } = require('weky')
    const game = new TicTacToe({
        message: message,
        opponent: opponent, //opponent
        xColor: 'red', //x's color
        oColor: 'blurple', //zero's color
        xEmoji: '❌',  //the x emoji
        oEmoji: '⭕' ,//the zero emoji
    })
    game.start()
}
}
