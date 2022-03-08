
const { MessageEmbed } = require('discord.js')
const Discord = require('discord.js')
const afk = require('../../afk')


module.exports = {
    name: 'afk',
    aliases: [],
    cooldown: '0',
    permissions: [],
    category: 'Misc',

  
    async execute(client, message, cmd,  args) {
        if(!message.member.roles.cache.has('851263668595326976') && !message.member.roles.cache.has('800814702800142337') && !message.member.roles.cache.has('926436979204292609') && !message.member.roles.cache.has('878635281241227344') && !message.member.roles.cache.has('937763384017973290')) return;
        const reason = args.join(" ") || 'AFK'
       
        let data = await afk.find(message.author.id, message.guild.id)
        if(data) {
                 if(Math.round(Date.now()/1000) - data?.timestamp < 30) return message.reply({ content: `A little too quick there.`, allowedMentions: { repliedUser: false }})
        }
        if(!data || data.AFK === false) {
            data = await afk.create(message.author.id, message.guild.id, true, reason, Math.round(Date.now()/1000))
            try {
            let embed = new MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setColor('FFFFFF')
            .setDescription(`<:reply:877221312198754355> I set your AFK: ${reason}`)
            message.reply({ embeds: [embed], allowedMentions: { repliedUser: false }})
            } catch (error) {
                console.log(error)
            }
        } else {
            return message.reply({ content: `You are already AFK`, allowedMentions: { repliedUser: false }})
        }
    }
}
