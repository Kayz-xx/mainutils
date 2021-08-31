
module.exports = {
  name: 'ttt',
  aliases: ['tictactoe'],
  cooldown: '10',
  permissions: [],
  category: 'Misc',
  
  async execute(client, message, cmd,  args) {
try {
    let opponent = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!opponent) return message.channel.send({content: "Please provide the user to challenge!"})
    let fighters = [message.member.id, opponent.id].sort(() => (Math.random() > .5) ? 1 : -1)
    let Args = {
        user: 0,
        a1: {
            style: "SECONDARY",
            label: " ",
            disabled: false,
            emoji: '<:blank:873573058709950514>'
        },
        a2: {
            style: "SECONDARY",
            label: " ",
            disabled: false,
            emoji: '<:blank:873573058709950514>'
        },
        a3: {
            style: "SECONDARY",
            label: " ",
            disabled: false,
            emoji: '<:blank:873573058709950514>'
        },
        b1: {
            style: "SECONDARY",
            label: " ",
            disabled: false,
            emoji: '<:blank:873573058709950514>'
        },
        b2: {
            style: "SECONDARY",
            label: " ",
            disabled: false,
            emoji: '<:blank:873573058709950514>'
        },
        b3: {
            style: "SECONDARY",
            label: " ",
            disabled: false,
            emoji: '<:blank:873573058709950514>'
        },
        c1: {
            style: "SECONDARY",
            label: " ",
            disabled: false,
            emoji: '<:blank:873573058709950514>'
        },
        c2: {
            style: "SECONDARY",
            label: " ",
            disabled: false,
            emoji: '<:blank:873573058709950514>'
        },
        c3: {
            style: "SECONDARY",
            label: " ",
            disabled: false,
            emoji: '<:blank:873573058709950514>'
        }
    }
    let { MessageButton, MessageActionRow } = require('discord.js')
    let msg = await message.channel.send({content: `**${message.member.displayName} vs ${opponent.displayName}**\n **TicTacToe** | <@!${Args.userid}>'s turn (⭕)`})
    tictactoe(msg)
    async function tictactoe(m) {
      let a1 = new MessageButton()
      .setStyle(Args.a1.style)
      .setCustomId('a1')
      .setEmoji(Args.a1.emoji)
      .setDisabled(Args.a1.disabled);
  let a2 = new MessageButton()
      .setStyle(Args.a2.style)
      .setEmoji(Args.a2.emoji)
      .setCustomId('a2')
      .setDisabled(Args.a2.disabled);
  let a3 = new MessageButton()
      .setStyle(Args.a3.style)
      .setEmoji(Args.a3.emoji)
      .setCustomId('a3')
      .setDisabled(Args.a3.disabled);
  let b1 = new MessageButton()
      .setStyle(Args.b1.style)
      .setEmoji(Args.b1.emoji)
      .setCustomId('b1')
      .setDisabled(Args.b1.disabled);
  let b2 = new MessageButton()
      .setStyle(Args.b2.style)
      .setEmoji(Args.b2.emoji)
      .setCustomId('b2')
      .setDisabled(Args.b2.disabled);
  let b3 = new MessageButton()
      .setStyle(Args.b3.style)
      .setEmoji(Args.b3.emoji)
      .setCustomId('b3')
      .setDisabled(Args.b3.disabled);
  let c1 = new MessageButton()
      .setStyle(Args.c1.style)
      .setEmoji(Args.c1.emoji)
      .setCustomId('c1')
      .setDisabled(Args.c1.disabled);
  let c2 = new MessageButton()
      .setStyle(Args.c2.style)
      .setEmoji(Args.c2.emoji)
      .setCustomId('c2')
      .setDisabled(Args.c2.disabled);
  let c3 = new MessageButton()
      .setStyle(Args.c3.style)
      .setEmoji(Args.c3.emoji)
      .setCustomId('c3')
      .setDisabled(Args.c3.disabled);
  let a = new MessageActionRow()
      .addComponents(a1, a2, a3)
  let b = new MessageActionRow()
      .addComponents(b1, b2, b3)
  let c = new MessageActionRow()
      .addComponents(c1, c2, c3)
      m.edit({content: `**${message.member.displayName} vs ${opponent.displayName}**\n**TicTacToe** | <@!${Args.userid}>'s turn (${Args.user == 0 ? "⭕" : "❌"})`, components: [a, b, c]})
        Args.userid=fighters[Args.user]
        let won = {
            "⭕": false,
            "❌": false
        }
        if (Args.a1.emoji == "<:TTTO:873550866915942430>" && Args.b1.emoji == "<:TTTO:873550866915942430>" && Args.c1.emoji == "<:TTTO:873550866915942430>") won["⭕"] = true
        if (Args.a2.emoji == "<:TTTO:873550866915942430>" && Args.b2.emoji == "<:TTTO:873550866915942430>" && Args.c2.emoji == "<:TTTO:873550866915942430>") won["⭕"] = true
        if (Args.a3.emoji == "<:TTTO:873550866915942430>" && Args.b3.emoji == "<:TTTO:873550866915942430>" && Args.c3.emoji == "<:TTTO:873550866915942430>") won["⭕"] = true
        if (Args.a1.emoji == "<:TTTO:873550866915942430>" && Args.b2.emoji == "<:TTTO:873550866915942430>" && Args.c3.emoji == "<:TTTO:873550866915942430>") won["⭕"] = true
        if (Args.a3.emoji == "<:TTTO:873550866915942430>" && Args.b2.emoji == "<:TTTO:873550866915942430>" && Args.c1.emoji == "<:TTTO:873550866915942430>") won["⭕"] = true
        if (Args.a1.emoji == "<:TTTO:873550866915942430>" && Args.a2.emoji == "<:TTTO:873550866915942430>" && Args.a3.emoji == "<:TTTO:873550866915942430>") won["⭕"] = true
        if (Args.b1.emoji == "<:TTTO:873550866915942430>" && Args.b2.emoji == "<:TTTO:873550866915942430>" && Args.b3.emoji == "<:TTTO:873550866915942430>") won["⭕"] = true
        if (Args.c1.emoji == "<:TTTO:873550866915942430>" && Args.c2.emoji == "<:TTTO:873550866915942430>" && Args.c3.emoji == "<:TTTO:873550866915942430>") won["⭕"] = true
        if (won["⭕"] != false) return m.edit({content:'⭕ won!', components: []})
        if (Args.a1.emoji == "<:TTTX:873550878727098428>" && Args.b1.emoji == "<:TTTX:873550878727098428>" && Args.c1.emoji == "<:TTTX:873550878727098428>") won["❌"] = true
        if (Args.a2.emoji == "<:TTTX:873550878727098428>" && Args.b2.emoji == "<:TTTX:873550878727098428>" && Args.c2.emoji == "<:TTTX:873550878727098428>") won["❌"] = true
        if (Args.a3.emoji == "<:TTTX:873550878727098428>" && Args.b3.emoji == "<:TTTX:873550878727098428>" && Args.c3.emoji == "<:TTTX:873550878727098428>") won["❌"] = true
        if (Args.a1.emoji == "<:TTTX:873550878727098428>" && Args.b2.emoji == "<:TTTX:873550878727098428>" && Args.c3.emoji == "<:TTTX:873550878727098428>") won["❌"] = true
        if (Args.a3.emoji == "<:TTTX:873550878727098428>" && Args.b2.emoji == "<:TTTX:873550878727098428>" && Args.c1.emoji == "<:TTTX:873550878727098428>") won["❌"] = true
        if (Args.a1.emoji == "<:TTTX:873550878727098428>" && Args.a2.emoji == "<:TTTX:873550878727098428>" && Args.a3.emoji == "<:TTTX:873550878727098428>") won["❌"] = true
        if (Args.b1.emoji == "<:TTTX:873550878727098428>" && Args.b2.emoji == "<:TTTX:873550878727098428>" && Args.b3.emoji == "<:TTTX:873550878727098428>") won["❌"] = true
        if (Args.c1.emoji == "<:TTTX:873550878727098428>" && Args.c2.emoji == "<:TTTX:873550878727098428>" && Args.c3.emoji == "<:TTTX:873550878727098428>") won["❌"] = true
        if (won["❌"] != false) return m.edit({content:'❌ won!', components: []})
    
        const filter = (button) => button.user.id === Args.userid;
        const collector = msg.createMessageComponentCollector({
          filter, max: 1, 
          time: 30000,
        });

        collector.on('collect', b => {
            if (Args.user == 0) {
                Args.user = 1
                Args[b.customId] = {
                  style: "DANGER",
                  emoji: '<:TTTO:873550866915942430>',
                  disabled: true
              }

            } else {
                Args.user = 0
                Args[b.customId] = {
                  style: "PRIMARY",
                  emoji: '<:TTTX:873550878727098428>',
                  disabled: true
              }
          
            }
            b.deferUpdate()
            const map = (obj, fun) =>
                Object.entries(obj).reduce(
                    (prev, [key, value]) => ({
                        ...prev,
                        [key]: fun(key, value)
                    }),
                    {}
                );
            const objectFilter = (obj, predicate) =>
                Object.keys(obj)
                    .filter(key => predicate(obj[key]))
                    .reduce((res, key) => (res[key] = obj[key], res), {});
            let Brgs = objectFilter(map(Args, (_, fruit) => fruit.label == " "), num => num == true);
            if (Object.keys(Brgs).length == 0) return m.edit({content: 'It\'s a tie!'})
            tictactoe(m)
        });
        collector.on('end', collected => {
            if (collected.size == 0) m.edit({content:`<@!${Args.userid}> didn\'t react in time! (30s)`, components: []})
        });
    }
  } catch (error) {
    console.log(error)
  }
}
}