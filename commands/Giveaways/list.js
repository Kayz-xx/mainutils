const Discord = require('discord.js');

const {
	Client,
	Message,
	MessageEmbed,
	Collection,
	MessageActionRow,
	MessageButton,
	ButtonInteraction,
} = require('discord.js');
const ms = require('ms');
const {Permissions} = require('discord.js')
let page = 0


module.exports = {
	name: 'glist',
	aliases: ['giveawaylist'],
	cooldown: '0',
	permissions: [],
	category: 'Giveaways',

	async execute(client, message, cmd, args) {
		if(message.member.roles.cache.some(x => x.id === '774008242127765535')) {
        let giveaways = client.giveaways.giveaways.filter(g => g.guildId === `${message.guild.id}` && !g.ended)
        if (giveaways.length === 0) return message.channel.send('No Giveaways In The Server.')

        let first = new MessageButton()
        .setEmoji('<:fastb:878937208818630706>')
        .setCustomId('first')
        .setStyle('SECONDARY');
  
      let back = new MessageButton()
        .setEmoji('<:behind:875319719161397248>')
        .setCustomId('back')
        .setStyle('SECONDARY');
  
      let next = new MessageButton()
        .setEmoji('<:ahead:875319731220017162>')
        .setCustomId('next')
        .setStyle('SECONDARY');
  
      let last = new MessageButton()
        .setEmoji('<:fasta:878937199578607626>')
        .setCustomId('last')
        .setStyle('SECONDARY');
  
      let del = new MessageButton()
        .setEmoji('<:Cancel:875313311640616971>')
        .setCustomId('del')
        .setStyle('DANGER');
  
      let row = new MessageActionRow().addComponents(
        first,
        back,
        del,
        next,
        last,
      );


      
const newd = giveaways.map((x, i) => {
    const rdate = Math.ceil(x.endAt / 1000);
  return `${i++}) [${x.prize}](https://discord.com/channels/${x.guildId}/${x.channelId}/${x.messageId}) **(${x.messageId})**\n**Ends At:** <t:${rdate}:R> (<t:${rdate}:F>)\n**Host:** ${x.hostedBy} in <#${x.channelId}>`
});
let pg = newd.length - 1

 
        const index = 10;
        const generateEmbed = (start) => {
        const current = newd.slice(start, start + index).join(`\n\n`);
        const embed = new MessageEmbed ()
        .setTitle("Currently Active Giveaways")
        .setColor("#406da2")
        .setDescription(current)
        .setFooter(
          `Page ${start / 10} of ${Math.floor(pg / 10)} | ${giveaways.length} Giveaways`
        );
        return embed;
        };
        
   
    const msg = await message.channel.send({
      embeds: [generateEmbed(0)],
      components: [row],
    });

    const filter = (btn) => btn.user.id === message.author.id;

    const collector = msg.createMessageComponentCollector({
      filter,
      time: 60000,
    });

    collector.on('collect', async (btn) => {
      if (btn.customId === 'first') {
        page = 0;
        btn.update({
          embeds: [generateEmbed(page)],
          components: [row],
        });
      }
      if (btn.customId === 'back') {
        if (page > Math.floor(pg / 10) * 10 || page <= 0) {
          return btn.deferUpdate();
        } else {
          page -= index;
          btn.update({
            embeds: [generateEmbed(page)],
            components: [row],
          });
        }
      }
      if (btn.customId === 'next') {
        if (page >= Math.floor(pg / 10) * 10 || page < 0) {
          return btn.deferUpdate();
        } else {
          page += index;
          btn.update({
            embeds: [generateEmbed(page)],
            components: [row],
          });
        }
      }
      if (btn.customId === 'last') {
        page = Math.floor(pg / 10) * 10;
        btn.update({
          embeds: [generateEmbed(page)],
          components: [row],
        });
      }
      if (btn.customId === 'del') {
        btn.deferUpdate();
        collector.stop();
        setTimeout(() => msg.delete(), 100);
      }
    });
    collector.on('end', (reason) => {
      msg.components[0].components.forEach((com) => {
        com.setDisabled(true);
        com.setStyle('SECONDARY');
      });
      let rows2 = new MessageActionRow().addComponents(
        msg.components[0].components
      );
      msg.edit({
        components: [rows2],
      });
    });
  }
	
        }
    }

    
	
