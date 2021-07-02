const  Discord = require('discord.js');
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION']});
const config = require('./config.json')
const prefix = require('./config.json')


client.commands = new Discord.Collection();
client.events = new Discord.Collection();


['command_handler', 'event_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord);
})


client.on('ready', () => {
    client.user.setActivity("~help" , { type: 'PLAYING'}).catch(console.error);
})

client.prefix = async function(message){
    let custom;
    custom = prefix;
}


client.on("message", async message => {
    const p = await client.prefix(message)
    if(message.mentions.users.first()) {
        if(message.mentions.users.first().id === '838050415504261120')      return message.channel.send({
            embed : {
              description : `Prefix is \`~\``,
              color : "RANDOM"
            }
          })
          
    }
})

client.login(config.token) 