const schema = require('../schemas/hl-schema');
const mongo = require('../mongo');

module.exports.addHighlight = async (guildId, userId, word) => {
	await mongo();
	const current = await schema.findOne({ guildId, userId });
	if(current) {
		if (current.words.includes(word) || current.words.length >= 5) return null;
	}
	const result = await schema.findOneAndUpdate(
		{
			guildId,
			userId,
		},
		{
			guildId,
			userId,
			$push: { words: word },
		},
		{
			upsert: true,
			new: true,
		},	
	);
	return result;
};

module.exports.searchHighlight = async (guildId, string) => {
	await mongo();
	const result = await schema.find({
		guildId,
	});
	let data = result.filter((res) =>
		res.words.some((x) => string.toLowerCase().includes(x.toLowerCase())),
	);
	if (!data) return null;

	return data;
	// for (let i = 0; i < result.length; i++) {
	// 	let trigger = result[i].words.find((str) =>
	// 		string.includes(str.toLowerCase()),
	// 	);
	// 	if (!trigger) return [null, null];
	// 	return [result[i], string];
	// }
};

module.exports.removeHighlight = async (guildId, userId, word) => {
	await mongo();
	const result = await schema.findOneAndUpdate(
		{
			guildId,
			userId,
		},
		{
			guildId,
			userId,
			$pull: { words: word },
		},
		{
			upsert: true,
			new: true,
		},
	);
	return result;
};

module.exports.listHighlight = async (guildId, userId) => {
	await mongo();
	const result = await schema.findOne({
		guildId,
		userId,
	});
	return result;
};
