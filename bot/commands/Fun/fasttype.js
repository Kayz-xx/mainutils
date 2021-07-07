module.exports = {
	name: 'ftype',
	aliases: ['fasttype'],
	cooldown: '10',
	permissions: [],
	category: 'Misc',
	

	async execute(client, message, cmd,  args) {
		words = ['hello', 'bye', 'noob', 'ooof', 'tricks'];
		const all = words[Math.floor(Math.random() * words.length)];
		const { FastType } = require('weky');
		const game = new FastType({
			message: message,
			winMessage: 'GG you won!', // message sent when user types perfectly
			sentence: all, // sentence-to-be-typed
			loseMessage: 'Lost ;(', // message sent when user misspell it
			time: 50000, // time that user has in ms
			startMessage: 'Good Luck!', // message sent when user starts playing
		});
		game.start();
	},
};
