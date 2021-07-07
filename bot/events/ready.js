

module.exports.run = (client) => {
  console.log(`${client.user.tag} is online`)
  const guild = client.guilds.cache.get('855455031385391104')
  client.user.setActivity(`${guild.memberCount} Members` , { type: 'WATCHING'}).catch(console.error);
 }
