
    module.exports = {
        name: 'serverinfo',
        aliases: ['si'],
        cooldown: '0',
        permissions: [],
        category: 'Info',
      
        async execute(client, message, cmd,  args) {
        const { MessageEmbed } = require('discord.js');
        const moment = require('moment');
        const verificationLevels = {
            NONE: 'None',
            LOW: 'Low',
            MEDIUM: 'Medium',
            HIGH: '💢',
            VERY_HIGH: '💥'
        };
        const regions = {
            brazil: '🇧🇷',
            europe: '🇪🇺',
            hongkong: '🇭🇰',
            india: '🇮🇳',
            japan: '🇯🇵',
            russia: '🇷🇺',
            singapore: '🇸🇬',
            southafrica: '🇿🇦',
            sydney: '🇦🇺',
            '🇺🇸': 'US East',
            '🇺🇸': 'US West',
            '🇺🇸': 'US South'
        };
        const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
        const members = message.guild.members.cache;
        const channels = message.guild.channels.cache;
        const emojis = message.guild.emojis.cache;
        let txt = '<:txtchannel:872428761478463510>'
        let ch = '<:voice:872428749642170378>'
        let mem = '<:members:872428777874018314>'
        let online = "<:9166_online:872428793506181150>"
        let idle = "<:idle:872428822904045578>"
        let dnd = "<:dnd:872428802263900210>"
        let offline = "<:offline:872428812477030430>"
        const embed = new MessageEmbed()
            .setColor('5539cc')
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .addFields(
                { name: 'Name', value: `${message.guild.name}`, inline: true },
                { name: 'Owner', value: `${message.guild.owner.user.tag}` },
                { name: 'Region', value: `${regions[message.guild.region]}`, inline: true },
                { name: `Boosts`, value: `${message.guild.premiumTier ? `Tier : ${message.guild.premiumTier}` : 'None'}`, inline: true },
                { name: `Verification Level `, value: `__${verificationLevels[message.guild.verificationLevel]}__`, inline: true },
                { name: 'Time Created', value: `${moment(message.guild.createdTimestamp).format('LT')} ${moment(message.guild.createdTimestamp).format('LL')} [${moment(message.guild.createdTimestamp).fromNow()}]` },
            )
            .addField(`${mem} Member Status`, `${online}  ${members.filter(member => member.presence.status === 'online').size}  ${dnd}: ${members.filter(member => member.presence.status === 'dnd').size}  ${idle}: ${members.filter(member => member.presence.status === 'idle').size}   ${offline}: ${members.filter(member => member.presence.status === 'offline').size}`)
            .addFields(
                { name: 'Bots ', value: `${members.filter(member => member.user.bot).size}`, inline: true },
                { name: 'Boost Count: ', value: `${message.guild.premiumSubscriptionCount || '0'}`, inline: true },
            )
            .addFields(
                { name: 'Roles', value: `${roles.length}`, inline: true },
                { name: 'Emoji Count', value: `${emojis.size}`, inline: true },
                { name: 'Member Count: ', value: `${members.size || '0'}`, inline: true },
            )
            .addField('Channels', `${txt} Channels : ${channels.filter(channel => channel.type === 'text').size} 
             ${ch} Channels : ${channels.filter(channel => channel.type === 'voice').size}`,
             )
            .setTimestamp();
        message.channel.send({embeds: [embed]});
    }

}