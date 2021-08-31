


module.exports = {
    name: 'rank',
    aliases: ['r'],
    cooldown: '0',
    permissions: [],
    category: 'Misc',
   
  async execute(client, message, cmd,  args) {
    const canvacord = require('canvacord');
    const Discord = require('discord.js');
    
        let level = 88;
        let xpObjectif = 154900;
        let xp = 152900;
        let xpBarre = (xpObjectif - xp) / xpObjectif * 490;

        let member = message.author
    try {
        const card = new canvacord.Rank()
        .setAvatar(member.displayAvatarURL({dynamic: false, format: 'png'}))
        .setCurrentXP(xp)
        .setRequiredXP(xpObjectif)
        .setLevel(level)
        .setStatus('online')
        .setProgressBar('#FFA500', "COLOR")
        .setUsername(member.username)
        .setDiscriminator(member.discriminator)
        card.build().then(data => {
            const att = new Discord.MessageAttachment(data, 'rank.png')
            message.channel.send({files: [att]})
        })
    } catch (error) {
        console.log(error)
    }
  }
}