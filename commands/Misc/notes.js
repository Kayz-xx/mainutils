
const { MessageEmbed } = require('discord.js')
const Discord = require('discord.js')
const {db} = require('../../firebase.js')


module.exports = {
    name: 'notes',
    aliases: ['notes', 'sn', 'deletenote', 'clearnotes', 'setnote'],
    cooldown: '0',
    permissions: [],
    usage: '<note>',
    description: 'Adds notes to a user(notes- checks and displays users notes) (sn- adds a note to a user) (deletenote- deletes a users specific note) (clearnotes- clears all the notes of a user)',
    category: 'Misc',

  

    async execute(client, message, cmd,  args) {

    if(cmd === 'notes'){
    
    const mention = message.mentions.users.first() || message.author

    const userId = mention.id
    
    let data2 = await db
    .ref(`Notes/${message.guild.id}/${userId}`)
    .once("value")
    .then(snapshot => snapshot.val()) || []
    if(data2.length === 0){  
        return message.reply(`There are no notes for this user.`)
    }   

    data2.reverse()

    let embed = new MessageEmbed()
    .setAuthor(mention.tag, mention.displayAvatarURL({ dynamic:true }))
    .setColor("RANDOM")
    .setTimestamp()
    data2.forEach((note) => {
      embed.addFields(
		{ name: `Note #${note.note_id}` , value: `From ${note.note_author} at <t:${note.timestamp}:R>: \n ${note.note}`, inline: true },
    )
    })
    return message.channel.send({embeds: [embed]})
  }

    if(cmd === 'sn' || cmd === 'setnote'){
 if(!message.member.roles.cache.has("774008242127765535") && !message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return;
      setTimeout(() => message.delete(), 1000)
    const mention = message.mentions.users.first() 
    

    if(!mention) {
       return message.channel.send({content: 'Please mention a user to add note to'})
    }

    const note = args.slice(1).join(' ');
    if(!note) {
        return message.channel.send({content: 'Please specify some information in the note'})
    }

    const guildId = message.guild.id
    const userId = mention.id

    const data = await db   
    .ref(`Notes/${message.guild.id}/${userId}`)
    .once("value")
    .then(snapshot => snapshot.val())|| []

    let note_id = Object.keys(data)
    if(note_id.length <= 0){
      note_id = 1
    }else{
      note_id = parseInt(note_id.unshift() + 1)
    }
    
    let  d = Math.round(Date.now() / 1000)

    data.push({
        "note" : note,
    "note_author" : `${message.author.tag}`,
    "timestamp" : d,
    "server_id" : guildId,
    "note_id": note_id
      })
      db.ref(`Notes/${message.guild.id}/${userId}`).set(data)


      return message.channel.send({content: `<:tick2:859344779367284736> ***Note taken.*** \n **Note:** ${note}`})

      }
      if(cmd === 'deletenote'){
 if(!message.member.roles.cache.has("774008242127765535") && !message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return;
        setTimeout(() => message.delete(), 1000)
        const mention = message.mentions.users.first() 
        const userId = mention.id
        let note = args[1] || null
        if(note === null){
        return message.channel.send({content: 'You did not select a specific note'}).then(m => m.delete({timeout: 15000}));
        } else {
           let data = await db
    .ref(`Notes/${message.guild.id}/${userId}`)
    .once("value")
    .then(snapshot => snapshot.val()) || []
    if(data.length === 0){
      return message.reply(`There are no notes for this user.`)
           }else if (note > data.length){
             return message.reply(`There are only ${data.length} notes, not ${note}`)
           }else {
             delete data[parseInt(note - 1)]
             db.ref(`Notes/${message.guild.id}/${userId}`).set(data)
             return message.channel.send({
          embeds : [{
            description : `Note Deleted!`,
            color : "RANDOM"
          }]
          })
        }
      }
    }
     if(cmd === 'clearnotes'){
 if(!message.member.roles.cache.has("774008242127765535") && !message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return;
      setTimeout(() => message.delete(), 1000)
      const mention = message.mentions.users.first() 
      const userId = mention.id
    
   let data = await db
  .ref(`Notes/${message.guild.id}/${userId}`)
  .once("value")
  .then(snapshot => snapshot.val()) || []
         if(data.length === 0){
          return message.reply(`There are no notes for this user.`)
         }else {
           delete data.splice(0, data.length)
           db.ref(`Notes/${message.guild.id}/${userId}`).set(data)
           return message.channel.send({
        embeds : [{
          description : `All notes Deleted!`,
          color : "RANDOM"
              }]
           })
        }
      }
    }
  }

    
