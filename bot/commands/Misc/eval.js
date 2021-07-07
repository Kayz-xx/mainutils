const { MessageEmbed } = require("discord.js")
const Discord = require('discord.js')
const { inspect } = require('util')
module.exports = {
    name: 'eval',
    aliases: ['ev'],
    cooldown: 0,
    category: 'Misc',
    ownerOnly: true, 

    
  
    async execute(client, message, cmd,  args) {
        const code = args.join(" ")
        if(!code) return message.channel.send("Please specify some code to evaluate!")

        try {
            const result = await eval(code)
            let output = result
            if(typeof result !== 'string') {
                output = inspect(result)
            }   
            message.channel.send(new MessageEmbed()
            .addField('Your code', `\`\`\`${code}\`\`\``)
            .addField("Result", `\`\`\`${output}\`\`\``)
            .setColor("RANDOM"))
        } catch (error) {
            console.log(error)
            message.channel.send("Content is too long to display!")
        }
    }
}