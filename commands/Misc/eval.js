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
        if(!code) return message.channel.send({content: "Please specify some code to evaluate!"})

        try {
            const result = await eval(code)
            let output = result
            if(typeof result !== 'string') {
                output = inspect(result)
            }   

            message.channel.send({embeds: [new MessageEmbed()
            .addField('Your code', `\`\`\`js\n${code}\`\`\``)
            .addField("Result", `\`\`\`js\n${output}\`\`\``)
            .setColor("RANDOM")]})
        } catch (error) {
            console.log(error)
            message.channel.send({content: "Content is too long to display!"})
        }
    }
}
