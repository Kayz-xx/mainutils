const schema = require('./schemas/ar-schema');
const mongo = require('./mongo');

module.exports.addAr = async (guildId, userId, type, string, response) => {
	return await mongo().then(async (mongoose) => {
		let result = await schema.findOne({
			guildId,
			userId,
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
	});
};

module.exports.checkAr = async (guildId) => {
	return await mongo().then(async (mongoose) => {
		return await schema.find({
			guildId,
		});
	});
};

module.exports.removeAr = async (guildId, userId, trigger) => {
	return await mongo().then(async (mongoose) => {
		const result = await schema.deleteOne({
			guildId,
			userId,
			trigger,
		})
		if (result.deletedCount === 1) return true ;
		else return false;
	});
};

module.exports.listAr = async (guildId, userId) => {
	return await mongo().then(async (mongoose) => {
		if (!userId) return await schema.find({ guildId });
		let result = await schema.find({
			guildId,
			userId,
		});
		return result;
	});
};

module.exports.clearAr = async (guildId, userId) => {
	return await mongo().then(async (mongoose) => {
		const result = await schema.deleteMany({
			guildId,
			userId,
		});
		return result;
	});
};

module.exports.modifyAr = async (
	guildId,
	userId,
	ignoredChannels,
	ignoredMembers,
) => {
	return await mongo().then(async (mongoose) => {
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
	});
};
