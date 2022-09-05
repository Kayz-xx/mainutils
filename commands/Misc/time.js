const userManager = require("../../functions/user");
const ct = require("countries-and-timezones");
const toTitleCase = (phrase) => {
  return phrase
    .toLowerCase()
    .split("/")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("/");
};

module.exports = {
  name: "time",
  aliases: ["timeset"],
  cooldown: "0",
  permissions: [],
  category: "Misc",
  async execute(client, message, cmd, args) {
    if (cmd === "time") {
      const user =
        client.users.cache.get(args[0]) ||
        message.mentions.users.first() ||
        message.author;

      const userTimezone = await userManager.getTimezone(
        message.guild.id,
        user.id
      );
      if(!userTimezone)  return message.channel.send({
        content:
          "Please select a timezone or city, check https://whatismyti.me/",
      });
      // const timezone = ct.getTimezone(userTimezone);
      const date = Math.round(Date.now() / 1000);
      const timezoneTime = new Date().toLocaleString("en-US", {
        timeZone: userTimezone,
      });
      const formatString = timezoneTime.split(", ");
      message.channel.send({
        content: `Your current timezone is **${userTimezone}**\nThe current time is: **${formatString[1]}**, ${formatString[0]}\n<t:${date}:f>`,
      });
    }
    if (cmd === "timeset") {
      const timezoneString = args.join("_");
      if (!timezoneString)
        return message.channel.send({
          content:
            "Please specify a timezone or city, check https://whatismyti.me/",
        });
      let timezone;
      if (!timezoneString.includes("/")) {
        allTimezones = ct.getAllTimezones();
        const keys = Object.keys(allTimezones);
        for (let i = 0; i < keys.length; i++) {
          const key = keys[i].split("/");
          if (key.length === 2) {
            if (key[1].toLowerCase() === timezoneString.toLowerCase())
              timezone = allTimezones[key.join("/")];
          }
        }
        if (!timezone)
          return message.channel.send({
            content:
              "Timezone does not exist, check https://whatismyti.me/ to make sure its valid.",
          });
        const userTimezone = await userManager.setTimezone(
          message.guild.id,
          message.author.id,
          timezone.name
        );
        if (!userTimezone) return;
        else
          return message.channel.send({
            content: `Timezone set to **${timezone.name}**`,
          });
      }
      timezone = ct.getTimezone(toTitleCase(timezoneString));
      
      if (!timezone)
        return message.channel.send({
          content:
            "Timezone does not exist, check https://whatismyti.me/ to make sure its valid.",
        });
      const userTimezone = await userManager.setTimezone(
        message.guild.id,
        message.author.id,
        timezone.name
      );
      if (!userTimezone) return;
      message.channel.send({
        content: `Timezone set to **${timezone.name}**`,
      });
    }
  },
};
