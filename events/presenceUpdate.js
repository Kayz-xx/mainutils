/*
module.exports.run = async (client, oldPresence, newPresence) => {
  if(newPresence.guild == "764885367160700958") {
  const role = newPresence.guild.roles.cache.get("872900600046690346");
  const member = newPresence.member
  const guild = newPresence.guild
  if(newPresence.activities) {
  newPresence.activities.forEach((activity) => {
      if(activity.name == "Custom Status") {
          if(activity.state == null) return;
          let statuses = ['.gg/elites', 'discord.gg/elites'];
          if (statuses.some(x => activity.state.includes(x))) {
      
            return member.roles.add(role)
            } 
          }
       })
     }
  }
}*/