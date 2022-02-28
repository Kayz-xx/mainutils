const economy = require('../../economy')
const { MessageEmbed } = require('discord.js')
const Discord = require('discord.js')
const formatter = new Intl.NumberFormat('en')
const {db} = require('../../firebase.js')
const eventdonations = require('../../eventdonations')
const {Permissions} = require('discord.js')
module.exports = {
    name: 'donoadd',
    aliases: ['donoadd', 'donationadd', 'eventdonoadd'],
    cooldown: '0',
    category: 'Donations',
    permissions: [],
    usage: '<user> <amount>, -eventdonoadd <user> <amount> <event>',
    description: 'Adds donation to a user',


  
    async execute(client, message, cmd,  args) {
    if(cmd === 'donoadd'){
    const mention = message.mentions.users.first()
    
    let data2 = await db
    .ref(`Donations/Info/${message.guild.id}/Settings/Role`)
    .once("value")
    .then(snapshot => snapshot.val())|| []
  db.ref(`Donations/Info/${message.guild.id}/Settings/Role`)

    
  if(!message.member.roles.cache.has(`${data2}`) && !message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return message.channel.send({content: 'You cant use this command'}) //replace with staff role id

    if (!mention) {
      message.reply({content:'Please tag a user to add the donation to'})
      return
    }

    const coins = args[1]
    if (isNaN(coins)) {
      message.reply({content:'Please provide a valid number of coins.'})
      return
    }

    const guildId = message.guild.id
    const userId = mention.id

    const newCoins = await economy.addCoins(guildId, userId, coins)
   
    let data3 = await db
    .ref(`Donations/Info/${message.guild.id}/Settings/Channel`)
    .once("value")
    .then(snapshot => snapshot.val())|| []
  db.ref(`Donations/Info/${message.guild.id}/Settings/Channel`)



    message.guild.channels.cache.get(`${data3}`). // replace with donation log channel id 
    send({embeds:[
      new Discord.MessageEmbed()
    .setTitle('Donation Logging')
    .setColor("RANDOM")
    .addFields(
      { name: 'User', value: `<@${userId}>` },
      { name: 'Amount Added', value: formatter.format(coins) },
      { name: 'New Total Amount', value: formatter.format(newCoins) },
    )
    .addField(`\u200B`,`[Link To CMD](${message.url})`)
    .setFooter(`Action taken by ${message.author.tag}`)
    .setTimestamp()
    ]})

      message.react('<a:EE_purplecheck:866351693108215849>')


      let data4 = await db
      .ref(`Donations/Info/${message.guild.id}/Settings`)
      .once("value")
      .then(snapshot => snapshot.val())|| []
      db.ref(`Donations/Info/${message.guild.id}/Settings`)

      let auser = message.mentions.members.first()

      let hasRole1 = auser.roles.cache.some(role => role.id === data4.Donorole1)
      let hasRole2 = auser.roles.cache.some(role => role.id === data4.Donorole2)
      let hasRole3 = auser.roles.cache.some(role => role.id === data4.Donorole3)
      let hasRole4 = auser.roles.cache.some(role => role.id === data4.Donorole4)
      let hasRole5 = auser.roles.cache.some(role => role.id === data4.Donorole5)
      let hasRole6 = auser.roles.cache.some(role => role.id === data4.Donorole6)
      let hasRole7 = auser.roles.cache.some(role => role.id === data4.Donorole7)
      let hasRole8 = auser.roles.cache.some(role => role.id === data4.Donorole8)
      let hasRole9 = auser.roles.cache.some(role => role.id === data4.Donorole9)

      function sleep(ms){
        return new Promise(resolve => setTimeout(resolve, ms))
        }

      if (!hasRole1 && newCoins >= data4.Amount1) {
        await sleep(2500)  
        auser.roles.add(data4.Donorole1)
      }  if (!hasRole2 && newCoins >= data4.Amount2) {
        await sleep(2500)  
        auser.roles.add(data4.Donorole2)
      }  if (!hasRole3 && newCoins >= data4.Amount3) {
        await sleep(2500)  
        auser.roles.add(data4.Donorole3)
      } if (!hasRole4 && newCoins >= data4.Amount4) {
        await sleep(2500)  
        auser.roles.add(data4.Donorole4)
      } if (!hasRole5 && newCoins >= data4.Amount5) {
        await sleep(2500)  
        auser.roles.add(data4.Donorole5)
      } if (!hasRole6 && newCoins >= data4.Amount6) {
        await sleep(2500)  
        auser.roles.add(data4.Donorole6)
      }  if (!hasRole7 && newCoins >= data4.Amount7) {
        await sleep(2500)  
        auser.roles.add(data4.Donorole7)
      }  if (!hasRole8 && newCoins >= data4.Amount8) {
        await sleep(2500)  
        auser.roles.add(data4.Donorole8)
      } if (!hasRole9 && newCoins >= data4.Amount9) {
        await sleep(2500)  
        auser.roles.add(data4.Donorole9)
      } 
      
    }


    if(cmd === 'eventdonoadd'){
          const mention = message.mentions.users.first();

			let data2 =
				(await db
					.ref(`Donations/Info/${message.guild.id}/Settings/Role`)
					.once('value')
					.then((snapshot) => snapshot.val())) || [];

			if (
				!message.member.roles.cache.has(`${data2}`) &&
				!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)
			)
				return message.channel.send({
					content: 'You cant use this command',
				}); //replace with staff role id

			if (!mention) {
				message.reply({
					content: 'Please tag a user to add the donation to',
				});
				return;
			}

			const type = args[1];
			let types = ['dank', 'owo', 'karuta'];
      if (!types.includes(type.toLowerCase())) 
				return message.reply({
					content: `Valid types are: ${types.join(', ')}`,
				});

			const eventcoins = args[2];
			if (isNaN(eventcoins)) {
				message.reply({
					content: 'Please provide a valid number of coins.',
				});
				return;
			}

			let data5 =
				(await db
					.ref(`Donations/Info/Events/${message.guild.id}/Event`)
					.once('value')
					.then((snapshot) => snapshot.val())) || [];

			const guildId = message.guild.id;
			const userId = mention.id;

			const neweventcoins = await eventdonations.addCoins(
				guildId,
				userId,
				eventcoins,
				type
			);
			await economy.addCoins(guildId, userId, eventcoins);

			let data3 =
				(await db
					.ref(`Donations/Info/${message.guild.id}/Settings/Channel`)
					.once('value')
					.then((snapshot) => snapshot.val())) || [];

			message.guild.channels.cache
				.get(`${data3}`) // replace with donation log channel id
				.send({
					embeds: [
						new Discord.MessageEmbed()
							.setTitle(`Event - ${data5} Donation Logging`)
							.setColor('RANDOM')
							.addFields(
								{ name: 'User', value: `<@${userId}>` },
								{
									name: 'Amount Added',
									value: formatter.format(eventcoins),
								},
								{
									name: 'New Total Amount',
									value: formatter.format(neweventcoins),
								}
							)
							.addField(`\u200B`, `[Link To CMD](${message.url})`)
							.setFooter(`Action taken by ${message.author.tag}`)
							.setTimestamp(),
					],
				});

			message.react('<a:EE_purplecheck:866351693108215849>');
    }     
  },
}
