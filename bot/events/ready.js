

module.exports.run = (client) => {
  console.log(`${client.user.tag} is online`)
  const guild = client.guilds.cache.get('764885367160700958')
  client.user.setActivity(`${guild.memberCount} Members` , { type: 'WATCHING'}).catch(console.error);
 }
