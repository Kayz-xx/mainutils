
const { MessageEmbed } = require('discord.js')
const Discord = require('discord.js')
const { afk } = require('../../collection')



module.exports = {
    name: 'afk',
    aliases: [],
    cooldown: '0',
    permissions: [],
    category: 'Misc',

  
    async execute(client, message, cmd,  args) {
        if(message.member.roles.cache.some(x => x.id === '764885367241048073')) return; 
        const reason = args.join(" ") || 'AFK'
        const left = 3

        const data = afk.get(message.author.id)
        if(!data) {
            afk.set(message.author.id, [Date.now(), reason])
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
