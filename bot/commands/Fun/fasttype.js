module.exports = {
	name: 'ftype',
	aliases: ['fasttype'],
	cooldown: '10',
	permissions: [],
	category: 'Misc',
	
	async execute(client, message, cmd,  args) {
	    let randomWords = require('random-words');
		const all = randomWords(200);
		let real = all[Math.floor(Math.random() * all.length)];
		const { FastType } = require('weky');
		const game = new FastType({
			message: message,
			winMessage: 'GG you won!', // message sent when user types perfectly
			sentence: real, // sentence-to-be-typed
			loseMessage: 'Lost ;(', // message sent when user misspell it
			time: 10000, // time that user has in ms
			startMessage: 'Good Luck!(Words are in spaces to avoid copypasta!)', // message sent when user starts playing
		});
		game.start();
	},
};
