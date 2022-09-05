const schema = require('../schemas/ar-schema');
const mongo = require('../mongo');

module.exports.addAr = async (guildId, userId, type, string, response) => {
	await mongo();
	let result = await schema.findOne({
		guildId,
		trigger: string,
	});
	if (result) return false;
	else
		return await new schema({
			guildId,
			userId,
			trigger: string,
			type,
			response,
		}).save();
};

module.exports.checkAr = async (guildId) => {
	await mongo();
	return await schema.find({
		guildId,
	});
};

module.exports.removeAr = async (guildId, userId, trigger) => {
	await mongo();
	const result = await schema.deleteOne({
		guildId,
		trigger,
	});
	if (result.deletedCount === 1) return true;
	else return false;
};

module.exports.listAr = async (guildId, userId) => {
	await mongo();
	if (!userId) return await schema.find({ guildId });
	let result = await schema.find({
		guildId,
		userId,
	});
	return result;
};

module.exports.clearAr = async (guildId, userId) => {
	await mongo();
	const result = await schema.deleteMany({
		guildId,
		userId,
	});
	return result;
};

module.exports.modifyAr = async (
	guildId,
	userId,
	ignoredChannels,
	ignoredMembers,
) => {
	await mongo();
	const result = await schema.updateMany(
		{
			guildId,
			userId,
		},
		{
			ignoredMembers,
			ignoredChannels,
		},
		{ upsert: true, new: true },
	);
	return result;
};
