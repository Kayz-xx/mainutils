
const {db} = require('../../firebase.js')
module.exports = {
  name: 'vouch',
  aliases: 'vouch, vc',
  cooldown: '5',
  permissions: [],

  async execute(client, message, cmd,  args, Discord) {
    if(cmd === 'vouch'){
    const target = message.mentions.users.first()
    if (!target) {
      message.reply('Please specify someone to vouch')
      return
    }

    const { guild } = message
    const guildId = guild.id
    const targetId = target.id
    const authorId = message.author.id
    const now = new Date()

    if (targetId === authorId) {
      message.reply('You cannot vouch yourself')
      return
    }

    let data = await db
    .ref(`Vouch System/${message.guild.id}/${targetId}`)
    .once("value")
    .then(snapshot => snapshot.val())|| []
    db.ref(`Vouch System/${message.guild.id}/${targetId}`)

  
if(!data.Vouches){
  let index = 1
db.ref(`Vouch System/${message.guild.id}/${targetId}/Vouches`).set(index)
}else{
  let data2 = data.Vouches + 1
db.ref(`Vouch System/${message.guild.id}/${targetId}/Vouches`).set(data2)
}


    message.react(
      `<:tick:859297441466679326>`
    )
  }
  if(cmd === 'vc'){
    const target = message.mentions.users.first() || message.author
    if (!target) {
      message.reply('Please specify a user!')
      return
    }

    const { guild } = message
    const guildId = guild.id
    const targetId = target.id

    let data = await db
    .ref(`Vouch System/${message.guild.id}/${targetId}`)
    .once("value")
    .then(snapshot => snapshot.val())|| []
    db.ref(`Vouch System/${message.guild.id}/${targetId}`)

    if(!data.Vouches){
      return message.channel.send({embed : {
        title: `User: ${target.username}`,
        description : `This user does not have any vouches!`,
        color : "RANDOM"
    }})

    }
    if(data.Vouches > 2){
     rating = 'pro'
    }


    message.channel.send(new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setAuthor(`${target.username}'s vouches`, target.avatarURL({ dynamic:true }))
    .addFields(
      { name: `total`, value: `\`${data.Vouches}\``, inline: true },) 
    .setFooter(`trust rating: ${rating}`)
    )}
 }
}
