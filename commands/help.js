const pagination = require('discord.js-pagination');
const Discord = require('discord.js');

module.exports = {
    commands: ['help'],
  minArgs: 0,
  maxArgs: 0,

    callback: async (message) => {


        const BotInfo = new Discord.MessageEmbed()
        .setColor(0xD866BE)
        .setTitle('Bot Information')
        .addField('**Prefix**', 'Bots prefix is: `-`')
        .addField('**Pages**', '`1.Bot Information`, `2.Donations`, `3.Misc`')
        .addField('**Navigation Help**', 'Use the arrows below to look through the pages!')

        const setup = new Discord.MessageEmbed()
        .setColor(0xD866BE)
        .setTitle('Setup')
        .setDescription('Start with setting up donation channel and donation manager role!, then move on to autorole and setup amounts(do not add commas in the value) **first** run `\-settings\` to check assignments, finally set up donor roles!')

        const Donations = new Discord.MessageEmbed()
        .setColor(0xD86685)
        .setTitle('Donations')
        .addField('`-mydono`', 'Shows you the donation of a user!')
        .addField('`-donoadd`', 'Adds donation to a user!')
        .addField('`-removedono`', 'Removes donation from a user!')
        .addField('`-setchannel`', 'Sets the donation log channel!')
        .addField('`-setrole`', 'Sets the role who can manage donations!')


        const Misc = new Discord.MessageEmbed()
        .setColor(0xD88066)
        .setTitle('Autoroles')
        .setDescription('You can add 9 roles and channels using this(syntax: role(1-9), amount(1-9)')
        .addField('`-ping`', 'Shows you the bots ping')
        .addField('`-role1`', 'Sets autrole!')
        .addField('`-role2`', 'Sets autrole!')
        .addField('`-role3`', 'Sets autrole!')
        .addField('`-role4`', 'Sets autrole!')
        .addField('`-amount1`', 'Sets autrole amount!')
        .addField('`-amount2`', 'Sets autrole amount!')
        .addField('`-amount3`', 'Sets autrole amount!')
        .addField('`-amount4`', 'Sets autrole amount!')
 

        const pages = [
            BotInfo,
            setup,
            Donations,
            Misc,
        ]

        const emojiList = ["⏪", "⏩"]

        const timeout = '600000';

        pagination(message, pages, emojiList, timeout)
    }
}
