
const { Permissions } = require("discord.js");

module.exports = {
  name: "purge",
  aliases: ["clear"],
  cooldown: "0",
  permissions: [],
  usage: "purge <amount>\npurge <amount> --users\npurge <amount> --bots",
  category: "Misc",

  async execute(client, message, cmd, args) {
    if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES))
      return;
    const usage = "```\npurge <amount>```";
    let int = args[0];
    if (!int) return message.channel.send(`No Amount Specified.\n${usage}`);
    if (int > 100) int = 100;

    try {
      await message.delete();
      const fetch = await message.channel.messages.fetch({ limit: int });
      const deletedMessages = await message.channel.bulkDelete(fetch, true);

      const results = {};
      for (const [, deleted] of deletedMessages) {
        const user = `${deleted.author.username}#${deleted.author.discriminator}`;
        if (!results[user]) results[user] = 0;
        results[user]++;
      }

      const userMessageMap = Object.entries(results);

      const finalResult = `${deletedMessages.size} message${
        deletedMessages.size > 1 ? "s" : ""
      } were removed!\n\n${userMessageMap
        .map(([user, messages]) => `**${user}** : ${messages}`)
        .join("\n")}`;
      await message.channel
        .send({ content: finalResult })
        .then(async (msg) => setTimeout(() => msg.delete(), 5000));
    } catch (err) {
      if (String(err).includes("Unknown Message"))
        return console.log("[ERROR!] Unknown Message");
    }
  },
};
