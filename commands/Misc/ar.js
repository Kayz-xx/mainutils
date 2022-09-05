const { Permissions, MessageEmbed } = require("discord.js");
const arManager = require("../../functions/autoResponse.js");

module.exports = {
  name: "aradd",
  aliases: ["arlist", "arremove", "arignore", "arunignore", "arlistall"],
  cooldown: "0",
  description: "Used to ar a member",
  category: "Misc",

  async execute(client, message, cmd, args) {
    if (
      !message.member.roles.cache.has("764885367400693764") &&
      !message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)
    )
      return;
    if (cmd === "aradd") {
      let type = args[0].toLowerCase();
      if (!["response", "react"].includes(type))
        return message.channel.send({
          content: "React or response only.",
        });
      let trigger = args[1];
      if (!trigger)
        return message.channel.send({
          content: "Please provide a trigger to add.",
        });
      let response = args.slice(2).join(" ");
      if (response === "" || response.length === 0)
        return message.channel.send({
          content: "Please provide a response.",
        });

      if (type === "react") {
        // let regex = /(<a?)?:\w+:(\d{18}>)?/g;
        // let check = response.test(regex);
        // if (!check)
        // 	return message.channel.send({
        // 		content: 'Not a valid emoji.',
        // 	});
        response = args[2];
        try {
          await message.react(response);
        } catch (err) {
          return message.channel.send({
            content: "Not a valid emoji.",
          });
        }
      }
      let res = await arManager.addAr(
        message.guild.id,
        message.author.id,
        type,
        trigger,
        response
      );
      if (res)
        return message.channel.send({
          content: `Successfully added ar with the trigger '${args[1]}'`,
        });
      else
        return message.channel.send({
          content: `There was an error creating the trigger.`,
        });
    }
    if (cmd === "arremove") {
      let trigger = args[0];
      if (!trigger)
        return message.channel.send({
          content: "Please provide a trigger to remove.",
        });
      let res = await arManager.removeAr(
        message.guild.id,
        message.author.id,
        trigger
      );

      if (res)
        return message.channel.send({
          content: `Successfully removed auto response with the trigger '${args[0]}'`,
        });
      else
        return message.channel.send({
          content: `No auto response found with that name.`,
        });
    }
    if (cmd === "arlist") {
      const user =
        client.users.cache.get(args[0]) ||
        message.mentions.users.first() ||
        message.author;
      if (!user) return;
      let list = await arManager.listAr(message.guild.id, user.id);
      if (list.length === 0)
        return message.channel.send({
          content: "You currently have no auto responses.",
        });
      let embed = new MessageEmbed()
        .setTitle(`${user.tag}'s Auto Responses`)
        .setColor("RANDOM")
        .setDescription(
          list
            .map((ar, i) => {
              i++;
              return `${i}). (${ar.trigger}) - ${ar.response}`;
            })
            .join("\n")
        )
        .setFooter({ text: `${list.length} auto responses` });
      return message.channel.send({ embeds: [embed] });
    }
    if (cmd === "arignore") {
      let ids = args[0].split(",");
      let ignoredChannels = [],
        ignoredMembers = [];
      if (!ids)
        return message.channel.send({
          content: `Please provide a valid list of ids to ignore.`,
        });
      for (let i = 0; i < ids.length; i++) {
        if (ids[i].length === 18) {
          let channel = await message.guild.channels
            .fetch(ids[i])
            .catch((err) => {});
          let member = await message.guild.members
            .fetch(ids[i])
            .catch((err) => {});
          if (channel) ignoredChannels.push(channel.id);
          if (member) ignoredMembers.push(member.id);
        }
      }
      let result = await arManager.modifyAr(
        message.guild.id,
        message.author.id,
        ignoredChannels,
        ignoredMembers
      );
      if (!result)
        return message.channel.send({
          content: "An error occurred!",
        });
      message.channel.send({
        content: "Ignored channels and members updated!",
      });
    }
    if (cmd === "arunignore") {
      let ids = args[0].split(",");
      let ignoredChannels = [],
        ignoredMembers = [];
      if (!ids)
        return message.channel.send({
          content: `Please provide a valid list of ids to unignore.`,
        });
      for (let i = 0; i < ids.length; i++) {
        if (ids[i].length === 18) {
          let channel = await message.guild.channels
            .fetch(ids[i])
            .catch((err) => {});
          let member = await message.guild.members
            .fetch(ids[i])
            .catch((err) => {});
          if (channel)
            ignoredChannels = ignoredChannels.filter(
              (item) => item !== channel.id
            );
          if (member)
            ignoredMembers = ignoredMembers.filter(
              (item) => item !== member.id
            );
        }
      }
      let result = await arManager.modifyAr(
        message.guild.id,
        message.author.id,
        ignoredChannels,
        ignoredMembers
      );
      if (!result)
        return message.channel.send({
          content: "An error occurred!",
          ephemeral: true,
        });
      message.channel.send({
        content: "Ignored channels and members updated!",
        ephemeral: true,
      });
    }
    if (cmd === "arlistall") {
      let list = await arManager.listAr(message.guild.id);
      if (list.length === 0)
        return message.channel.send({
          content: "There are currently no auto responses.",
        });
      let embed = new MessageEmbed().setColor("RANDOM").setDescription(
        list
          .map((ar, i) => {
            i++;
            return `${i}) ${ar.trigger}`;
          })
          .join("\n")
      );
      return message.channel.send({ embeds: [embed] });
    }
  },
};
