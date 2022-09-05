const schema = require('../schemas/user-schema');
const mongo = require('../mongo');
const addRole = async (guildId, userId, roleId) => {
	await mongo();
	return await schema.findOneAndUpdate(
		{ guildId, userId },
		{ roleId },
		{ upsert: true, new: true },
	);
};

const removeRole = async (guildId, userId) => {
	await mongo();
	return await schema.findOneAndUpdate(
		{ guildId, userId },
		{ roleId: '' },
		{ upsert: true, new: true },
	);
};

const getRole = async (guildId, userId) => {
	await mongo();
	let result = await schema.findOne({ guildId, userId });
	return result.roleId;
};

const setTimezone = async (guildId, userId, timezone) => {
	await mongo();
	return await schema.findOneAndUpdate(
		{ guildId, userId },
		{ timezone },
		{ upsert: true, new: true },
	);
};

const getTimezone = async (guildId, userId) => {
	await mongo();
	let result = await schema.findOne({ guildId, userId });
  if(!result) return null
	return result.timezone;
};

const findPing = async (guildId, userId) => {
	await mongo();
	let result = await schema.findOne({ userId });
	if (!result) {
		result = await new schema({
			guildId,
			userId,
			pings: [],
		}).save();
	}
	return result;
};

module.exports = {
	addRole,
	removeRole,
	getRole,
	setTimezone,
	getTimezone,
	findPing,
};
