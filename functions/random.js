const axios = require('axios');
const getAdvice = async () => {
	let json = await axios('https://api.adviceslip.com/advice');

	json = json.data;
	if (!json) console.log('Unable to access the json content of API');

	return { embed: { description: json.slip.advice, color: 'RANDOM' } };
};
const getJoke = async (options) => {
	if (!options) options = {};
	let embed;
	if (options.name) {
		let json = await axios(
			`http://api.icndb.com/jokes/random?firstName=${options.name.first}&lastName=${options.name.last}`,
		);

		json = json.data;
		if (!json.type || json.type !== 'success')
			console.log('Unable to access the json content of API');

		embed = {
			embed: {
				description: json.value.joke,
				color: 'RANDOM',
			},
		};
	} else {
		let json = await axios(
			`https://official-joke-api.appspot.com/random_joke`,
		);

		json = json.data;

		if (!json) console.log('Unable to access the json content of API');

		embed = {
			embed: {
				title: json.setup,
				description: json.punchline,
				color: 'RANDOM',
			},
		};
	}

	return embed;
};

const getMeme = async () => {
	let tag = ['memes', 'me_irl', 'dankmemes', 'comedyheaven', 'Animemes'];
	tag = tag[Math.floor(Math.random() * tag.length)];

	let json = await axios(`https://www.reddit.com/r/${tag}/random/.json`, {});

	json = json.data;
	if (!json) console.log('Unable to access the json content of API');
	json = json[0].data.children[0].data;

	let content = {
		embed: {
			color: 'RANDOM',
			image: {
				url: json.is_video
					? 'https://i.stack.imgur.com/mwFzF.png'
					: json.url,
			},
			title: json.title,
		},
	};

	return content;
};

module.exports = { getAdvice, getJoke, getMeme };
