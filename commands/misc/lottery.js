const {MessageEmbed} = require('discord.js')
const {db} = require('../../firebase')
module.exports = {
    name: 'lotterystart',
    aliases: 'enter, lotterystart, lotteryend',
    cooldown: '0',
    permissions: [],
    description: 'Lottery System!',

  
  async execute(client, message, cmd,  args, Discord) {
      if(cmd === 'lotterystart'){
        let data = await db
        .ref(`Lottery System/${message.guild.id}/Lottery`) 
        .once("value")
        .then(snapshot => snapshot.val())|| []
        if(data.status === 'true'){
            message.channel.send(new MessageEmbed()
            .setTitle('An Error Occured <:sim:860034795169251358>')
            .setDescription('A lottery is already being hosted!')
            .setFooter(`Run \`lotteryend\` to end the lottery`)
            .setTimestamp()
            .setColor('CE1212'))
        } else {
    const prize = args.slice(0).join(' ');
    if(!prize){ return message.channel.send('Please specify a prize!')}
    message.channel.send(new MessageEmbed()
    .setAuthor('New Lottery!', message.author.avatarURL({ dynamic:true }))
    .setTitle(`${message.author.tag} started a lottery for ${prize}! <a:im4:858370157890371595>`)
    .setThumbnail('https://cdn.discordapp.com/icons/764885367160700958/a_38503e9dec18ac442fecaad24a3d07c0.gif?size=1024')
    .setTimestamp()
    .setColor('5C33F6'))
    lotteryBool = 'true'
    db.ref(`Lottery System/${message.guild.id}/Lottery/status`).set(lotteryBool)
    db.ref(`Lottery System/${message.guild.id}/Lottery/prize`).set(prize)

        }
      } 
      if(cmd === 'enter'){
        let data = await db
        .ref(`Lottery System/${message.guild.id}/Lottery`) 
        .once("value")
        .then(snapshot => snapshot.val())|| []
        playerList = [];
		if(data.status === 'true'){
			if(playerList.includes(message.author.id)){
				message.reply("You have already entered the lottery");
			} else {
				playerList.push(message.author);
				message.reply(new MessageEmbed()
                .setAuthor('Lottery', message.author.avatarURL({ dynamic:true }))
                .setDescription(`${message.author} has entered the lottery for **${data.prize}**!`)
                .setFooter('Good Luck')
                .setTimestamp()
                .setColor('5C33F6'));
                console.log(playerList)
			}
    }else{
			message.reply(new MessageEmbed()
            .setTitle('An Error Occured <:sim:860034795169251358>')
            .setDescription('There is no lottery being hosted at the moment.')
            .setFooter(`Ask staff to host a lottery.`)
            .setTimestamp()
            .setColor('CE1212'));
    }
}
        if(cmd === 'lotteryend'){
            lotteryBool = 'false';
            db.ref(`Lottery System/${message.guild.id}/Lottery/status`).set(lotteryBool)
            let data = await db.ref(`Lottery System/${message.guild.id}/Lottery`)
		 if(playerList.length >= 1){
			const winner = playerList[Math.floor(Math.random()*playerList.length)];
			winner.send(new MessageEmbed()
            .setDescription(`Congratulations you have won the lottery!`)
            .addField(`\u200B`, `[Lottery](${message.url})`)
            .setFooter('Your prize will be payed out soon.')
            .setTimestamp()
            .setColor('5C33F6'));;
			message.channel.send(new MessageEmbed()
            .setTitle('Congratulations! <a:im6:860038641841602581>')
            .setDescription(`${winner} has won the lottery!`)
            .setFooter('Your prize will be payed out soon.')
            .setTimestamp()
            .setColor('5C33F6'));
         }
        else if(data.status = 'false') {
			message.reply(new MessageEmbed()
            .setTitle('An Error Occured <:sim:860034795169251358>')
            .setDescription('No lottery is being held!')
            .setFooter(`Use \`enter\` to join the lottery`)
            .setTimestamp()
            .setColor('CE1212'));
        }
		else {
			message.reply(new MessageEmbed()
            .setTitle('An Error Occured <:sim:860034795169251358>')
            .setDescription('No one entered the lottery!')
            .setFooter(`Use \`enter\` to join the lottery`)
            .setTimestamp()
            .setColor('CE1212'));
		}
        playerList = [];
	
        }
    }
}