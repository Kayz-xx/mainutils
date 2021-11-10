const {Permissions, MessageEmbed} = require('discord.js')
module.exports = {
    name: 'role',
    aliases: [],
    cooldown: '0',
    description: 'Used to assign roles to a member.',
    usage: `<user> <role>`,
    category: 'Misc',

  
    async execute(client, message, cmd,  args) {
        if(!message.member.roles.cache.has("764885367400693764") && !message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return
      let syntax = 'e!role <user> <role>'
      let embed = new MessageEmbed()
      .setAuthor(message.author.tag, message.author.displayAvatarURL())
      .setTitle('Invalid Syntax')
      .setDescription(`\`\`\`markdown\n${syntax}\n${" ".repeat(syntax.length - 5)}^^^^\`\`\`\n**Example:** \`e!role 491933949686448138 892371996955009074\``)
      .setColor("DARK_RED")
      let user = args[0]
      let roles = args[1]
      let target;
      if(!user) return message.reply({embeds: [embed.setDescription(`\`\`\`markdown\n${syntax}\n${" ".repeat(syntax.length - 12)}^^^^\`\`\`\n**Example:** \`e!role 491933949686448138 892371996955009074\``)]})
      if(!roles) return message.reply({embeds: [embed]})
      user = user.replace(/[\\<>@#&!]/g, "");
      target = await message.guild.members.fetch(user).catch(error => {})
      if(!target) return message.reply('Could not find that user.')
      let role = message.guild.roles.cache.get(roles)
      console.log(target.roles.cache.some(r => r.id == role.id))
      if (target.roles.cache.some(r => r.id == role.id)) {
        target.roles.remove(role)
        message.channel.send({content: `Removed **${role.name}** from **${target.user.tag}**`})
      }
      else {
      target.roles.add(role)
      message.channel.send({content: `Added **${role.name}** to **${target.user.tag}**`})
      }
  }
}
