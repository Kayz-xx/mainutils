const { Client, Message, MessageEmbed } = require('discord.js'); 
const discordTTS =require("discord-tts"); 

module.exports = {
    name: 'tts',
    aliases: ['texttospeech'],
    cooldown: '2',
    permissions: [],
    category: 'Misc',
  
    async execute(client, message, cmd,  args) {
        if (message.author.id !== "491933949686448138")
            return message.channel.send({content: 'Coming Soon!'});
            
const voiceChannel = message.member.voice.channel; 
const say = args.join(' ')

if(!voiceChannel) return message.channel.send('Join to a voice channel and try it **again**.')
if(!say) {
    let a = new MessageEmbed()
    .setTitle('**What do you want the bot to say?**')
    .setColor("RED")
    return message.channel.send(a) 
    } 
        voiceChannel.join().then(connection => {
            const stream = discordTTS.getVoiceStream(say); 
            const dispatcher = connection.play(stream);
            dispatcher.on('finish', () => {
                message.channel.send(`I have finished saying ${say}`);
            });
            dispatcher.on('error', console.error);
        })
    
   }
} 