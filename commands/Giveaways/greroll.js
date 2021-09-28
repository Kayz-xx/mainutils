const Discord = require('discord.js');
const ms = require('ms');
const {Permissions} = require('discord.js')



module.exports = {
	name: 'greroll',
	aliases: ['giveawayreroll'],
	cooldown: '0',
	permissions: [],
	category: 'Giveaways',

	async execute(client, message, cmd, args) {
	
        if(message.member.roles.cache.some(x => x.id === '774008242127765535')) {

        if(!args[0]){
            return message.reply({content:`\`\`\`\yml\nSyntax: e!greroll <messageId> [winner=1]\n                   ^^^^^^^^^\n\nmessageId is a required argument that is missing. \`\`\``});
        }

        let winner = 1
        if(args[1]) winner = parseInt(args[1])
    
    

        let giveaway = 

       client.giveaways.giveaways.find((g) => g.prize === args.join(' ')) ||
   
       client.giveaways.giveaways.find((g) => g.messageId === args[0]);
    

        if(!giveaway){
            return message.reply({content:'Giveaway "'+ args.join(' ') + '" not found.'});
        }
    
	setTimeout(() => message.delete(), 1000)
       client.giveaways.reroll(giveaway.messageId, {
           winnerCount: winner,
           messages: {
            error: 'Not enough participants, giveaway cannot be rerolled.',
            congrat: 'Congratulations {winners}! You have won the reroll for the **{this.prize}** giveaway! Make sure to wait at least 12 hours before DMing the host for the prize. You\'ll get rerolled if you DM before 12 hours. \n{this.messageURL}'
           }
       })
        .then(() => {
        })
        .catch((e) => {
            if(e.startsWith(`No valid participations, no new winner(s) can be chosen!`)){
                message.reply({content:'This giveaway has no new winner(s)!'});
            } else {
                console.error(e);
            }
        });
    }
	},
};
