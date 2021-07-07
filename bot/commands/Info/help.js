
const Discord = require('discord.js');
const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const config = require("../../config.json")
const client = new Discord.Client()
let prefix = config.prefix
const { MessageActionRow, MessageButton } = require('discord-buttons')
let categories = [];

module.exports = {
    name: "help",
    aliases: ['help me'],
     category: "info",
    
    description: "Help Command",
  async execute(client, message, cmd,  args) {
    
    if (!args[0]) {
  
    
      readdirSync("./bot/commands/").forEach((dir) => {
        const commands = readdirSync(`./bot/commands/${dir}/`).filter((file) =>
          file.endsWith(".js")
        );
    
        const cmds = commands.map((command) => {
          let file = require(`../../commands/${dir}/${command}`);
    
    
          if (!file.name) return "No command name.";
    
          let name = file.name.replace(".js", "");
    
          return `\`${name}\``;
        });
    
        let data = new Object();
    
        data = {
          name: dir.toString(),
          value: cmds.length === 0 ? "In progress." : cmds.join(" "),
        };
    
        categories.push(data);

        const found = categories.find(e => e.name == 'Applications' );
        
      
      });
    } else {
      const command =
        client.commands.get(args[0].toLowerCase()) ||
        client.commands.find(
          (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
        );
    
      if (!command) {
        const embed = new MessageEmbed()
          .setTitle(`Invalid command! Use \`${prefix}help\` for all of my commands!`)
          .setColor("RANDOM");
        return message.channel.send(embed);
      }
    
      const embed = new MessageEmbed()
        .setTitle("Command Details:")
        .addField("Prefix:", `\`${prefix}\``)
        .addField(
          "Command:",
          command.name ? `\`${command.name}\`` : "No name for this command."
        )
        .addField(
          "Aliases:",
          command.aliases
            ? `\`${command.aliases}\``
            : "No aliases for this command."
        )
        .addField(
          "Usage:",
          command.usage
            ? `\`${prefix}${command.name} ${command.usage}\``
            : `\`${prefix}${command.name}\``
        )
        .addField(
          "Description:",
          command.description
            ? command.description
            : "No description for this command."
        )
    
        .setFooter(
          `Requested by ${message.author.tag}`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp()
        .setColor("5C33F6");
      return message.channel.send(embed);
    }
    
      const btn1 = new MessageButton()
      .setLabel('📝 Applications')
      .setID('1')
      .setStyle('blurple')
      const btn2 = new MessageButton()
      .setLabel('Donations').setEmoji('862223890825740339')
      .setID('2').setStyle('blurple')
      const btn3 = new MessageButton()
      .setLabel('Fun')
      .setID('3').setStyle('blurple')
      const btn4 = new MessageButton()
      .setLabel('Info').setEmoji('862223846723682344')
      .setID('4').setStyle('blurple')
      const btn5 = new MessageButton()
      .setLabel('Misc')
      .setID('5').setStyle('blurple')

      const row = new MessageActionRow()
      .addComponent(btn1)
      .addComponent(btn2)
      .addComponent(btn3)
      .addComponent(btn4)
      .addComponent(btn5);

  const basic = new Discord.MessageEmbed()
  .setTitle('Help Menu')
  .setDescription('For more info about a specific command: use e!help [command] \n For viewing all commands click the buttons you want the commands of!')
  .addFields(
    { name: '📝 Applications', value: '`Application System`', inline: true },
    { name: '<:dono:862223890825740339> Donations', value: '`Donation System`', inline: true },
    { name: '<a:fun:862223812950360065> Fun', value: '`Random Fun Commands`', inline: true },
    { name: '<:info:862223846723682344> Info', value: '`Information Commands`', inline: true },
    { name: '<a:misc:862223831044325426> Misc', value: '`Miscellaneous Commands`', inline: true },
  )
  .setColor("5C33F6")
  const found = categories.find(e => e.name == 'Applications' );
  console.log(found.value)
  const found2 = categories.find(e => e.name == 'Donations' );
  console.log(found2.value)
  const found3 = categories.find(e => e.name == 'Fun' );
  console.log(found3.value)
  const found4 = categories.find(e => e.name == 'Info' );
  console.log(found4.value)
  const found5 = categories.find(e => e.name == 'Misc' );
  console.log(found5.value)

  const embed1 = new Discord.MessageEmbed()
  .setTitle('Application Commands')  
  .setDescription(found.value)
  .setTimestamp()
  .setColor("5C33F6");
  const embed2 = new Discord.MessageEmbed()
  .setTitle('Donations')  
  .setDescription(found2.value)
  .setTimestamp()
  .setColor("5C33F6");
  const embed3 = new Discord.MessageEmbed()
  .setTitle('Fun')  
  .setDescription(found3.value)
  .setTimestamp()
  .setColor("5C33F6");
  const embed4 = new Discord.MessageEmbed()
  .setTitle('Info')  
  .setDescription(found4.value)
  .setTimestamp()
  .setColor("5C33F6");
  const embed5 = new Discord.MessageEmbed()
  .setTitle('Misc')  
  .setDescription(found5.value)
  .setTimestamp()
  .setColor("5C33F6");


  let msg = await message.channel.send({embed : basic, components : row})

  


  client.on('clickButton', async (button) => {

    if (button.id === '1') {
      button.reply.send(embed1, true);
      button.reply.defer()
    } else if (button.id === '2') {
      button.reply.send(embed2, true);
     button.reply.defer()
    } else if (button.id === '3') {
      button.reply.send(embed3, true);
     button.reply.defer()
    } else if (button.id === '4') {
        button.reply.send(embed4, true);
             button.reply.defer()
    } else if (button.id === '5') {
        button.reply.send(embed5, true);
             button.reply.defer()
              }
          })
        }
      }
