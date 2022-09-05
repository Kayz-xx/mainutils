const Discord = require("discord.js");
const { db } = require("../../firebase");
const { MessageEmbed } = require("discord.js");
const { Permissions } = require("discord.js");
module.exports = {
  name: "accept",
  aliases: [],
  category: "Applications",
  cooldown: "0",
  usage: "<message.id> <Event Manager | Giveaway Manager | Moderator>",
  description:
    "This a command that accept's applicants. (Only Admins can use this command)",
  permissions: [],

  async execute(client, message, cmd, args) {
    if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR))
      return message.channel.send({
        content: "This command can only be used by administrators!",
      });
    const messageID = args[0];
    let acceptQuery = args.slice(1).join(" ").toLowerCase();
    try {
      const applicationChannel = message.guild.channels.cache.get(
        message.channel.id
      );
      const applicationdEmbed = await applicationChannel.messages.fetch(
        messageID
      );

      const data = applicationdEmbed.embeds[0];
      const acceptEmbed = new MessageEmbed()
        .setTitle(data.title)
        .setAuthor(data.author.name)
        .setDescription(data.description)
        .setColor(data.color)
        .addField("Status **(Accepted)**", `${acceptQuery}`);

      applicationdEmbed.edit({ embeds: [acceptEmbed] });

      let data2 =
        (await db
          .ref(`Applications/${message.guild.id}`)
          .once("value")
          .then((snapshot) => snapshot.val())) || [];

      db.ref(`Applications/${message.guild.id}`);

      if (acceptQuery === "event manager") {
        acceptQuery =
          "Congratulations! <a:EE_nyaJump:866031709056401408> You have been accepted as a Event Manager, you have been given the 》Event Manager《 role. Please wait for further instructions.<a:EE_qb_dance:866031344941400064>";
      } else if (acceptQuery === "giveaway manager") {
        acceptQuery =
          "Congratulations! <a:EE_nyaJump:866031709056401408> You have been accepted as a Giveaway Manager, you have been given the 》Giveaway Manger《 role. Please wait for further instructions.<a:EE_qb_dance:866031344941400064>";
      } else if (acceptQuery === "moderator") {
        acceptQuery =
          "Congratulations! <a:EE_nyaJump:866031709056401408> You have been accepted as a Moderator, you have been given the 》Trial Mod《 role. Please wait for further instructions.<a:EE_qb_dance:866031344941400064>";
      } else if (acceptQuery === "karuta manager") {
        acceptQuery =
          "Congratulations! <a:EE_nyaJump:866031709056401408> You have been accepted as a Karuta Manager, you have been given the 》Karuta Manager《 role. Please wait for further instructions.<a:EE_qb_dance:866031344941400064>";
      } else if (acceptQuery === "partnership manager") {
        acceptQuery =
          "Congratulations! <a:EE_nyaJump:866031709056401408> You have been accepted as a Partnership Manager, you have been given the 》Partership Manager《 role. Please wait for further instructions.<a:EE_qb_dance:866031344941400064>";
      }
      const user = await client.users.cache.find(
        (u) => u.tag === data.author.name
      );
      user.send({
        embeds: [
          {
            title: "Application Accepted",
            description: `${acceptQuery}`,
            color: "#77ACF1",
          },
        ],
      });

      // user.roles.add(data3.Staffrole)
    } catch (err) {
      console.log(err);
    }
  },
};
