const {db} = require('../../firebase')
const { Client, Message, MessageEmbed, Collection } = require('discord.js')
const economy = require('../../economy')
const formatter = new Intl.NumberFormat('en')
const eventdonations = require('../../eventdonations')

module.exports = {
    name: 'eventleaderboard',
    aliases: 'eventleaderboard, eventlb',
    cooldown: '0',
    usage: '',
    permissions: [],
    commands: ['eventleaderboard'],
    description: 'Event Donation Leaderboard',
    async execute(client, message, cmd,  args, Discord) {

            const collection = new Collection();

            await Promise.all(
                message.guild.members.cache.map(async(member) => {
                     const guildId = message.guild.id
                     const userId = member.id
                    const donation = await eventdonations.getDonation(guildId, userId)
                return donation !== 0 ? collection.set(userId, {
                    userId,
                    donation,
                })
                : null
                })
            )
            const data = collection.sort((a, b) => b.donation - a.donation).first(10); 

            db.ref(`Donations/Info/Event Leaderboard`).set(data)

            message.channel.send(
                new MessageEmbed()
                .setTitle(`Event Donation Leaderboard in ${message.guild.name}`)
                .setDescription(
                    data.map((v, i) => {
                    return `${i+1}) ${client.users.cache.get(v.userId).tag} - **${formatter.format(v.donation)} coins**`
                }))
                .setFooter(`These are event donations`)
                 )
            }
    }
