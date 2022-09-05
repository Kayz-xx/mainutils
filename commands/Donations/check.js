const economy = require("../../functions/economy");
const { MessageEmbed } = require("discord.js");
const formatter = new Intl.NumberFormat("en");

module.exports = {
  name: "check",
  aliases: ["mydono", "check"],
  cooldown: "0",
  permissions: [],
  category: "Donations",
  usage: "<user>",
  description: "Checks a users donation or your own donation!",

  async execute(client, message, cmd, args) {
    let str;
    let che = false;
    let user = args[0];
    let target;
    if (!user) target = message.author;
    else {
      user = user.replace(/[\\<>@#&!]/g, "");
      target = await client.users.fetch(user).catch((error) => {});
      if (!target) {
        che = true;
        str = "This user was not found";
        target = message.author;
      }
    }
    const targetId = target.id;

    const guildId = message.guild.id;
    const userId = target.id;

    const coins = await economy.getCoins(guildId, userId);

    let check = [
      10000000, 20000000, 50000000, 100000000, 200000000, 500000000, 750000000,
      1000000000, 2000000000,
    ];

    let val = check[0];

    if (coins >= check[0]) val = check[1];
    if (coins >= check[1]) val = check[2];
    if (coins >= check[2]) val = check[3];
    if (coins >= check[3]) val = check[4];
    if (coins >= check[4]) val = check[5];
    if (coins >= check[5]) val = check[6];
    if (coins >= check[6]) val = check[7];
    if (coins >= check[7]) val = check[8];

    let num = val - coins;
    if (coins >= val) num = 0;

    let bar = `<:pb1:871998564849582121><:pb2:871998577717698592><:pb2:871998577717698592><:pb2:871998577717698592><:pb3:871998593039495168>`;

    function percentage(partialValue, totalValue) {
      return (100 * partialValue) / totalValue;
    }

    const totalActivities = val;
    const doneActivities = coins;

    let per = percentage(doneActivities, totalActivities);

    if (per >= 10)
      bar = `<a:pbl1:872370206192844861><:pb2:871998577717698592><:pb2:871998577717698592><:pb2:871998577717698592><:pb3:871998593039495168>`;
    if (per >= 20)
      bar = `<a:phl1:872365651552006217><:pb2:871998577717698592><:pb2:871998577717698592><:pb2:871998577717698592><:pb3:871998593039495168>`;
    if (per >= 30)
      bar = `<a:pbf1:871999120901029909><a:phl2:872365641657614346><:pb2:871998577717698592><:pb2:871998577717698592><:pb3:871998593039495168>`; //
    if (per >= 40)
      bar = `<a:pbf1:871999120901029909><a:pbh1:872363339441901588><:pb2:871998577717698592><:pb2:871998577717698592><:pb3:871998593039495168>`;
    if (per >= 50)
      bar = `<a:pbf1:871999120901029909><a:pbf2:871999177662533763><a:phl2:872365641657614346><:pb2:871998577717698592><:pb3:871998593039495168>`; //
    if (per >= 60)
      bar = `<a:pbf1:871999120901029909><a:pbf2:871999177662533763><a:pbh1:872363339441901588><:pb2:871998577717698592><:pb3:871998593039495168>`;
    if (per >= 70)
      bar = `<a:pbf1:871999120901029909><a:pbf2:871999177662533763><a:pbf2:871999177662533763><a:phl2:872365641657614346><:pb3:871998593039495168>`; //
    if (per >= 80)
      bar = `<a:pbf1:871999120901029909><a:pbf2:871999177662533763><a:pbf2:871999177662533763><a:pbh1:872363339441901588><:pb3:871998593039495168>`;
    if (per >= 90)
      bar = `<a:pbf1:871999120901029909><a:pbf2:871999177662533763><a:pbf2:871999177662533763><a:pbf2:871999177662533763><a:pbl3:872366029454577664>`;
    if (per >= 100)
      bar = `<a:pbf1:871999120901029909><a:pbf2:871999177662533763><a:pbf2:871999177662533763><a:pbf2:871999177662533763><a:pbf3:871999189205254154>`;

    let mesg = `${formatter.format(num)} left for next donation role`;
    if (num === 0) mesg = `Congrats, you have all the donation roles`;

    let embed = new MessageEmbed()
      .setAuthor(`${target.tag}'s Donations`)
      .setColor("RANDOM")
      .addField(
        `Amount Donated in ${message.guild.name}:`,
        `${formatter.format(coins)} / ${formatter.format(val)} \`(${per.toFixed(
          2
        )}%)\`\n_${mesg}_`,
        true
      )
      .addField(`Progress`, bar)
      .setTimestamp();
    if (che) {
      embed.setFooter(str);
    }
    message.channel.send({ embeds: [embed] });
  },
};
