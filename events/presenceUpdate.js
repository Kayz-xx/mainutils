  /*module.exports.run = async (client, oldPresence, newPresence) => {
  if(newPresence.guild == "764885367160700958") {
  const {member, guild} = newPresence
  if(newPresence.activities) {
  newPresence.activities.forEach((activity) => {
      if(activity.name === "Custom Status") {
          if(activity.state === null) return;
          let statuses = ['.gg/elites', 'discord.gg/elites'];
          if(activity.state.match(/discord.gg|.gg/g).length > 1) return;
          if (statuses.some(x => activity.state.includes(x))) {
            return member.roles.add('872900600046690346')
            } 
          }
       })
     }
  }
}
*/
