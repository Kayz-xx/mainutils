const { token } = require('./config.json');

const discord = require('discord.js');

const { GiveawaysManager } = require('discord-giveaways')
const giveawayModel = require('./schemas/giveaway-schema')


const client = new discord.Client({
	allowedMentions: {
	  parse: ["roles", "users", "everyone"],
	  repliedUser: true,
	},
	partials: ["MESSAGE", "CHANNEL", "REACTION"],
	intents: [
	  "GUILDS",
	  "GUILD_MEMBERS",
	  "GUILD_BANS",
	  "GUILD_MESSAGE_REACTIONS",
	  "GUILD_MESSAGES",
	  "GUILD_PRESENCES",
	  "GUILD_MESSAGE_REACTIONS"
	],
  });
//const category = {};
const GiveawayManagerWithOwnDatabase = class extends GiveawaysManager {

    async getAllGiveaways() {
      
        return await giveawayModel.find({});
    }

    async saveGiveaway(messageId, giveawayData) {
 
        await giveawayModel.create(giveawayData);
    
        return true;
    }

 
    async editGiveaway(messageId, giveawayData) {
   
        await giveawayModel.findOneAndUpdate({ messageId }, giveawayData, { omitUndefined: true }).exec();

        return true;
    }

   
    async deleteGiveaway(messageId) {
    
        await giveawayModel.findOneAndDelete({ messageId }).exec();
    
        return true;
    }
};

const Creator = new GiveawayManagerWithOwnDatabase(client, {
    hasGuildMembersIntent: true,
    default: {
        botsCanWin: false,
		exemptPermissions: [],
        embedColor: '2D46B9',
        embedColorEnd: '171717',
        reaction: '<a:EE_check:881050609959190528>'
		}
    })


client.commands = new discord.Collection();
client.aliases = new discord.Collection();
client.snipes = new discord.Collection();
client.vouches = new Map();
client.giveaways = Creator

require('@weky/inlinereply');

let array = ['command', 'events', 'giveaways'];
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



