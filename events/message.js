const client = require('../index')
const prefix = client.prefix;
const { Collection } = require('discord.js');
const Timeout = new Collection();
const ms = require('ms')

client.on('message', async message =>{
    if(message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;
    if(!message.guild) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if(cmd.length == 0 ) return;
    let command = client.commands.get(cmd)
    if(!command) command = client.commands.get(client.aliases.get(cmd));
    if (!command) return message.reply(`invalid command`)
  
  if(command.cooldown) {
            if(Timeout.has(`${command.name}${message.author.id}`)) return message.channel.send(`You are on a \`${ms(Timeout.get(`${command.name}${message.author.id}`) - Date.now(), {long : true})}\` cooldown.`)
           // command.run(client, message, args)
            Timeout.set(`${command.name}${message.author.id}`, Date.now() + command.cooldown)
            setTimeout(() => {
                Timeout.delete(`${command.name}${message.author.id}`)
            }, command.cooldown)
        }
      if(command.subcommands && (command.subcommands.includes(args[0]))){
            let subcommand = args.shift()
            subcommand = command[subcommand]

            if(subcommand.args){
              return message.reply(`Missing argument `)
            }
            if(subcommand.guildOnly){
             if(!message.guild){
                return message.reply(`You cannot run this command in dms`)
              }
            }
            
            return subcommand.run(client, message, args);
          }else{
            command.run(client, message, args);
          }
      
        
});