
const { MessageEmbed } = require("discord.js");

module.exports.run = (client, oldPresence, newPresence) => {
     function sleep(ms){
        return new Promise(resolve => setTimeout(resolve, ms))
        }
    const role = newPresence.guild.roles.cache.get("872900600046690346");
    const member = newPresence.member
    const guild = newPresence.guild
    if(newPresence.activities) {
    newPresence.activities.forEach((activity) => {
        if(activity.name == "Custom Status") {
            if(activity.state == null) return;
            let statuses = ['.gg/elites', 'discord.gg/elites'];
            if (statuses.some(x => activity.state.includes(x))) {
              let channel = guild.channels.cache.find(x => x.id === "764885369530744868")
              channel.send(new MessageEmbed()
            .setAuthor(member.displayName)
            .setDescription(`<@&872900600046690346> added to ${member.displayName}`)
            .setFooter(member.id)
            )
                     await sleep(2500)  
              return member.roles.add(role)
            } else {
              if(member.roles.cache.get(role.id)) {
                       await sleep(2500)  
               member.roles.remove(role)
              }
            }
        }
    })
    }
}
