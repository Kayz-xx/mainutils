const discord = require('discord.js');


module.exports = {
    name: 'purge',
    aliases: ['clear'],
    cooldown: '0',
    permissions: [],
    usage: 'purge <amount>\npurge <amount> --users\npurge <amount> --bots',
    category: 'Misc',
   
  async execute(client, message, cmd,  args) {
      if(!message.member.roles.cache.some(x => x.id === '764885367400693764') && !message.member.hasPermission('ADMINISTRATOR')) return;
        const usage = '```\npurge <amount>\npurge <amount> --users\npurge <amount> --bots\n```';
        if (!args.length) return message.channel.send(`No Amount Specified.\n${usage}`);
        let amount = parseInt(args[0]);
        if (isNaN(amount)) return message.channel.send(`Invalid Number Specified.\n${usage}`);
        if (args[1]) {
            const flag = args[1].toLowerCase();
            if (flag != '--users' && flag != '--bots') return message.channel.send(`Invalid Flag Specified.\n${usage}`);
            const messages = await message.channel.messages.fetch({limit: 100});
            let count = 0, toDelete = [];
            messages.forEach(msg => {
                if (count > amount) return;
                if (flag === '--users') {
                    if (!msg.author.bot) toDelete.push(msg);
                    count++;
                } else if (flag === '--bots') {
                    if (msg.author.bot) toDelete.push(msg);
                    count++;
                }
            });
            if (toDelete.length) {
                try {
                    await message.delete();
                    await message.channel.bulkDelete(toDelete, true)
                    .then(num => message.channel.send(`Deleted ${num.size} Message(s)!`));
                } catch (err) {
                    return message.channel.send(err.message);
                }
            } else {
                return message.channel.send('No messages found with that flag.');
            }
        } else {
            try {
                await message.delete();
                await message.channel.bulkDelete(amount, true)
                .then(num => message.channel.send(`Deleted ${num.size} Message(s)!`));
            } catch (err) {
                return message.channel.send(err.message);
            }
        }
    }
}
