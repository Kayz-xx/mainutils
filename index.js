// require('dotenv').config();
const config = require('./config.json')
// const token = process.env.TOKEN;
const token = config.TOKEN
const { Client, Collection } = require('discord.js');

const { GiveawaysManager } = require('discord-giveaways');
const giveawayModel = require('./schemas/giveaway-schema');

const mongo = require('./mongo');
const client = new Client({
	allowedMentions: {
		parse: ['roles', 'users'],
		repliedUser: true,
	},
	partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
	intents: [
		'GUILDS',
		'GUILD_MEMBERS',
		'GUILD_BANS',
		// "GUILD_VOICE_STATES",
		'GUILD_MESSAGES',
		// "GUILD_PRESENCES",
		'GUILD_MESSAGE_REACTIONS',
		'DIRECT_MESSAGE_REACTIONS',
		'DIRECT_MESSAGES',
	],
});
//const category = {};
const GiveawayManagerWithOwnDatabase = class extends GiveawaysManager {
	async getAllGiveaways() {
		await mongo();
		return await giveawayModel.find({});
	}

	async saveGiveaway(messageId, giveawayData) {
		await mongo();
		await giveawayModel.create(giveawayData);

		return true;
	}

	async editGiveaway(messageId, giveawayData) {
		await mongo();
		await giveawayModel
			.findOneAndUpdate({ messageId }, giveawayData, {
				omitUndefined: true,
			})
			.exec();

		return true;
	}

	async deleteGiveaway(messageId) {
		await mongo();
		await giveawayModel.findOneAndDelete({ messageId }).exec();
		return true;
	}
};

const Creator = new GiveawayManagerWithOwnDatabase(client, {
	hasGuildMembersIntent: true,
  endedGiveawaysLifetime: 36 * 60 * 60 * 1000,
	default: {
		botsCanWin: false,
		exemptPermissions: [],
		embedColor: '2D46B9',
		embedColorEnd: '171717',
		reaction: '<a:EE_check:881050609959190528>',
	},
});

client.commands = new Collection();
client.aliases = new Collection();
client.snipes = new Collection();
// client.vouches = new Map();
client.giveaways = Creator;

let array = ['command', 'events', 'giveaways', 'antiCrash'];
array.forEach((handler) => {
	require(`./handlers/${handler}`)(client);
});

/*client.commands.forEach((obj) => {
	let cmdObject = {
		name: obj.name,
		permissions: obj.authorPermission,
		usage: obj.usage,
		aliases: obj.aliases,
		cooldown: obj.cooldown,
		description: obj.description,
		category: obj.category,
	};
	if (Object.keys(category).find((x) => x === obj.category)) {
		category[obj.category].push(cmdObject);
	} else {
		category[obj.category] = [cmdObject];
	}
});*/

client.login(token);
