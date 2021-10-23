
const { Permissions } = require('discord.js');
const ms = require('ms')
module.exports = {
	name: 'slowmode',
	aliases: ['sm'],
	cooldown: '0',
	permissions: [],
	category: 'Misc',
	async execute(client, message, cmd, args) {
     try{
        if(!message.member.roles.cache.has(`792799102140022785`) && !message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return;
        let time = args[0]
        if(!time) return message.channel.send("Please specify a time!")
        let msd = ms(time)
        if(msd > 21600) return message.reply('Maximum slowmode in a channel is 6 hours.')
        let str = `The slowmode for this channel has been set to ${ms(msd, {long: true})}`
        if(msd == 0) str = `The slowmode for this channel has been disabled`
        message.channel.setRateLimitPerUser(msd);
        message.reply(str)
     } catch (error) {
         console.log(error)
     }
	},
};
