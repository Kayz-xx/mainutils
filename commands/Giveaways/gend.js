const Discord = require('discord.js');
const ms = require('ms');
const {Permissions} = require('discord.js')



module.exports = {
	name: 'gend',
	aliases: ['giveawayend'],
	cooldown: '0',
	permissions: [],
	category: 'Giveaways',

	async execute(client, message, cmd, args) {
	 
        if(!message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES) && !message.member.roles.cache.some((r) => r.name === "Giveaways")){
            return;
        }
    

        if(!args[0]){
            return message.reply({content:`\`\`\`\yml\nSyntax: e!gend <messageId>\n                   ^^^^^^^^^\n\nmessageId is a required argument that is missing. \`\`\``});
        }

    
    
    
        let giveaway = 
     
        client.giveaways.giveaways.find((g) => g.prize === args.join(' ')) ||

        client.giveaways.giveaways.find((g) => g.messageId === args[0]);
    
      
        if(!giveaway){
            return message.reply({content:'Giveaway "'+ args.join(' ') + '" not found.'});
        }
    
  
        client.giveaways.edit(giveaway.messageId, {
            setEndTimestamp: Date.now()
        })
        .then(() => {
        })
        .catch((e) => {
            if(e.startsWith(`No giveaway found with message Id ${giveaway.messageId}`)){
                message.reply({content:'This giveaway has already ended!'});
            } else {
                console.error(e);
            }
        });
	},
};
