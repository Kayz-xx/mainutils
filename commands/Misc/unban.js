const { Permissions, MessageEmbed } = require("discord.js");
module.exports = {
  name: "unban",
  aliases: [],
  cooldown: "0",
  description: "Used to ban a member",
  category: "Misc",

  async execute(client, message, cmd, args) {
    if (
      !message.member.roles.cache.has("764885367400693764") &&
      !message.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)
    )
      return;
    let syntax = "e!unban <user> [reason]";
    let embed1 = new MessageEmbed()
      .setAuthor(message.author.tag, message.author.displayAvatarURL())
      .setTitle("Invalid Syntax")
      .setDescription(
        `\`\`\`markdown\n${syntax}\n${" ".repeat(
          syntax.length - 14
        )}^^^^\`\`\`\n**Example:** \`e!unban 491933949686448138 unbanned\``
      )
      .setColor("DARK_RED");
    let user = args[0];
    let reasoning = args.slice(1).join(" ");
    if (reasoning === "") reasoning = `Unbanned by ${message.author.tag}`;
    let target;
    if (!user) return message.reply({ embeds: [embed1] });
    user = user.replace(/[\\<>@#&!]/g, "");
    target = await client.users.fetch(user).catch((error) => {});
    message.delete();
    if (!target) return message.channel.send("Could not find that user!");

    let bans = await message.guild.bans.fetch();
    let buser = bans.find((x) => x.user.id === target.id);
    if (!buser) return message.channel.send("Not a previosly banned member.");
    message.guild.members.unban(target.id, [reasoning]);
    let embed = new MessageEmbed()
      .setTitle("Unban")
      .setDescription(
        `**Offender**: ${target.tag}\`(${
          target.id
        })\`\n**Reason**: ${reasoning}\n**Moderator**: ${
          message.author.tag
        }\n**User**: ${target.toString()}`
      )
      .setFooter(`ID: ${target.id}`)
      .setTimestamp()
      .setColor("GREEN");
    message.channel.send({ content: `**Unbanned ${target.tag}**` });
    channel = client.channels.cache.get("803741521928519680");
    channel.send({ embeds: [embed] });
  },
};
