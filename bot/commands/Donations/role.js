const {db} = require('../../firebase')
const DiscordJS = require('discord.js')

module.exports = {
    name: 'role',
    aliases: ['setautorole'],
    cooldown: '0',
    permissions: [],
    usage: '<role>',
    description: 'Sets up autoroles(autoroles are roles automatically added when a user hits a specific amount of donation!)',
    category: 'Donations',
    
    async execute(client, message, cmd,  args) {    
      
      try{
                if (!message.member.hasPermission('MANAGE_GUILD'))
            return message.channel.send('You do not have permission to use this command.').then(m => m.delete({timeout: 5000}));

            message.channel.send("This is the setup for autoroles, use the roles id's for setting them up ")

            const questions = [
              'Please specify role 1',
              'Please specify role 2',
              'Please specify role 3',
              'Please specify role 4',
              'Please specify role 5',
              'Please specify role 6',
              'Please specify role 7',
              'Please specify role 8',
              'Please specify role 9',
            ];
            let counter = 0;
      
            const filter = (m) => {
              return m.author.id === message.author.id;
            };
      
            const collector = new DiscordJS.MessageCollector(
              message.channel,
              filter,
              {
                max: questions.length,
                time: 100000,
              }
            );
      
            message.channel.send(questions[counter++]);
            collector.on('collect', (m) => {
              if (counter < questions.length) {
                m.channel.send(questions[counter++]);
              }
            });
      
            collector.on('end', (collected) => {
              console.log(`Collected ${collected.size} messages`);
      
              if (collected.size < questions.length) {
                message.reply('You did not answer the questions in time');
                return;
              }

              collected.forEach(async (role) => {
                await message.guild.roles.cache.find(r => r.id === role);
              });

      
              let counter = 0;
              collected.forEach((value) => {
                console.log(questions[counter++], value.content);
              });

              let index = 1;
              collected.forEach((value) => {
                db.ref(
                  `Donations/Info/${
                    message.guild.id
                  }/Settings/Donorole${index++}`
                ).set(value.content);
              });
            });

            let data5 = await db
            .ref(`Donations/Info/${message.guild.id}/Settings/Amount1`) 
            .once("value")
            .then(snapshot => snapshot.val())|| []
            db.ref(`Donations/Info/${message.guild.id}/Settings/Amount1`)
            if(data5.length === 0) {
                return message.reply('No Amount has been set')
            }

         

      }catch(e){
        console.log(e.stack)
        return message.channel.send(e.message)
      }

    }
  }