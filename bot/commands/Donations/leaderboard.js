const {db} = require('../../firebase')
const { Client, Message, MessageEmbed, Collection } = require('discord.js')
const economy = require('../../economy')
const formatter = new Intl.NumberFormat('en')



module.exports = {
    name: 'leaderboard',
    aliases: ['leaderboard'],
    cooldown: '0',
    usage: '',
    permissions: [],
    commands: ['leaderboard'],
    category: 'Donations',
    description: 'Donation Leaderboard',
    
    async execute(client, message, cmd,  args) {

            const collection = new Collection();

            await Promise.all(
                message.guild.members.cache.map(async(member) => {
                     const guildId = message.guild.id
                     const userId = member.id
                    const donation = await economy.getDonation(guildId, userId);
                return donation !== 0 ? collection.set(userId, {
                    userId,
                    donation,
                })
                : null
                })
            )
            const data = collection.sort((a, b) => b.donation - a.donation).first(10);

 
            db.ref(`Donations/Info/${message.guild.name}/Leaderboard`).set(data)

            message.channel.send(
                new MessageEmbed()
                .setTitle(`Donation Leaderboard in ${message.guild.name}`)
                .setDescription(
                    data.map((v, i) => {
                    return `${i+1}) ${client.users.cache.get(v.userId).tag} - **${formatter.format(v.donation)} coins**`
                }))
                .setFooter(`These are normal donations`)
                 )
                }

            }
        
    
