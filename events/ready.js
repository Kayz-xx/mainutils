module.exports.run = (client) => {
  client.user.setActivity(`e!help`, { type: "PLAYING" });
  console.log(
    `${client.user.tag} is now online.(Status: ${client.user.presence.status})`
  );
};
