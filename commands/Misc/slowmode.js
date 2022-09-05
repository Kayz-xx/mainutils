const { Permissions } = require("discord.js");
const ms = require("ms");
module.exports = {
  name: "slowmode",
  aliases: ["sm"],
  cooldown: "0",
  permissions: [],
  category: "Misc",
  async execute(client, message, cmd, args) {
    try {
      if (
        !message.member.roles.cache.has(`792799102140022785`) &&
        !message.member.roles.cache.has(`764885367400693764`) &&
        !message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)
      )
        return;
      if (
        message.channel.id !== "792795803037990943" &&
        message.channel.id !== "792505415748812801" &&
        message.channel.id !== "916771549753778246"
      )
        return message.reply(
          "Command can only be used in <#792795803037990943> or <#792505415748812801>"
        );
      let time = args[0];
      if (!time) return message.channel.send("Please specify a time!");
      if (isNaN(time)) return message.reply("Please specify a valid number");
      let str = `The slowmode for this channel has been set to ${time} seconds`;
      if (parseInt(time) == 0)
        str = `The slowmode for this channel has been disabled`;
      message.channel.setRateLimitPerUser(parseInt(time));
      message.reply(str);
    } catch (error) {
      console.log(error);
    }
  },
};
