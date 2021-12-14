
const formatter = new Intl.NumberFormat('en')
const eventdonations = require('../../eventdonations')
const economy = require('../../owo')
const economy2 = require('../../karuta')
const {
	Client,
	Message,
	MessageEmbed,
	Collection,
	MessageActionRow,
	MessageButton,
	ButtonInteraction,
} = require('discord.js');
  let page = 0;
module.exports = {
    name: 'eventleaderboard',
    aliases: ['eventleaderboard', 'eventlb', 'wleaderboard', 'kleaderboard'],
    cooldown: '0',
    usage: '',
    permissions: [],
    commands: ['eventleaderboard'],
    category: 'Donations',
    description: 'Event Donation Leaderboard',
    
    async execute(client, message, cmd,  args) {
      if(cmd === 'eventleaderboard' || cmd === 'eventlb') {
     
      const guildId = message.guild.id
      const data = await eventdonations.getDonation(guildId);


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


let text = []
for(let i = 0; i < data.length; i++) {
  const {userId, eventcoins} = data[i];

  text.push(`${i+1}) <@!${userId}> - **${formatter.format(eventcoins)} coins**\n`)
}
let pg = text.length - 1


      const index = 10;
      const generateEmbed = (start) => {
      const current = text.slice(start, start + index).join(`\n\n`);
      const embed = new MessageEmbed ()
      .setTitle(`Donation Leaderboard in ${message.guild.name}`)
      .setDescription(`${current}`)
      .setFooter(`These are normal donations`)
      .setColor('88FFF7')
      .setFooter(
        `Page ${start / 10} of ${Math.floor(pg / 10)}`
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
    if(cmd === 'wleaderboard') {
      const guildId = message.guild.id
      const data = await economy.getDonation(guildId);


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


let text = []
for(let i = 0; i < data.length; i++) {
  const {userId, coins} = data[i];

  text.push(`${i+1}) <@!${userId}> - **${formatter.format(coins)} cowoncy**\n`)
}
let pg = text.length - 1


      const index = 10;
      const generateEmbed = (start) => {
      const current = text.slice(start, start + index).join(`\n\n`);
      const embed = new MessageEmbed ()
      .setTitle(`Donation Leaderboard in ${message.guild.name}`)
      .setDescription(`${current}`)
      .setFooter(`These are normal donations`)
      .setColor('88FFF7')
      .setFooter(
        `Page ${start / 10} of ${Math.floor(pg / 10)}`
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
    if(cmd === 'kleaderboard') {
      const guildId = message.guild.id
      const data = await economy2.getDonation(guildId);


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


let text = []
for(let i = 0; i < data.length; i++) {
  const {userId, coins} = data[i];

  text.push(`${i+1}) <@!${userId}> - **${formatter.format(coins)} tickets**\n`)
}
let pg = text.length - 1


      const index = 10;
      const generateEmbed = (start) => {
      const current = text.slice(start, start + index).join(`\n\n`);
      const embed = new MessageEmbed ()
      .setTitle(`Donation Leaderboard in ${message.guild.name}`)
      .setDescription(`${current}`)
      .setFooter(`These are normal donations`)
      .setColor('88FFF7')
      .setFooter(
        `Page ${start / 10} of ${Math.floor(pg / 10)}`
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
