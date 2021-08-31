
const Discord = require('discord.js')



module.exports = {
    name: 'fight',
    aliases: ['fight'],
    cooldown: '0',
    permissions: [],
    category: 'Misc',
    description: 'Just a regular fight command',

  
    async execute(client, message, cmd,  args) {
        try {
        const challenger = message.author
        const oppenent = message.mentions.users.first()
  
        if(oppenent.bot) return message.channel.send({content: "You can't fight bots."})
        if(oppenent.id === challenger.id) return message.channel.send({content:"You can't fight yourself."})
    
          const challengerHealth = 100;
          const oppenentHealth = 100;
      
          const challengerLastAttack = 'heal';
          const oppenentLastAttack = 'heal';
      
          const gameData = [
            { member: challenger, health: challengerHealth, lastAttack: challengerLastAttack },
            { member: oppenent, health: oppenentHealth, lastAttack: oppenentLastAttack }
          ];
      
          let player = 0;
      
          const checkHealth = (member) => {
            if (gameData[member].health <= 0) return true;
            else return false;
          };
  
          const { MessageButton, MessageActionRow } = require('discord.js')
          let btn1 = new MessageButton()
          .setLabel('Punch')
          .setCustomId('P1')
          .setStyle('PRIMARY')
          let btn2 = new MessageButton()
          .setLabel('Defend')
          .setCustomId('D1')
          .setStyle('SUCCESS')
          let btn3 = new MessageButton()
          .setLabel('Cancel')
          .setCustomId('C1')
          .setStyle('DANGER')
          let btn4 = new MessageButton()
          .setLabel('Kick')
          .setCustomId('K1')
          .setStyle('PRIMARY')
          let row = new MessageActionRow()
          .addComponents(btn1, btn4, btn2, btn3)

          const tempPlayer = (player + 1) % 2;
          let bar = `<:pb1:871998564849582121><:pb2:871998577717698592><:pb2:871998577717698592><:pb2:871998577717698592><:pb3:871998593039495168>`

          function percentage(partialValue, totalValue) {
              return (100 * partialValue) / totalValue;
          }
      
              const totalActivities = 100
              const doneActivities = gameData[player].health
              
              let per = percentage(doneActivities, totalActivities)
      
                  if(per >= 10) bar = `<a:pbl1:872370206192844861><:pb2:871998577717698592><:pb2:871998577717698592><:pb2:871998577717698592><:pb3:871998593039495168>`
                  if(per >= 20) bar = `<a:phl1:872365651552006217><:pb2:871998577717698592><:pb2:871998577717698592><:pb2:871998577717698592><:pb3:871998593039495168>`
                  if(per >= 30) bar = `<a:pbf1:871999120901029909><a:phl2:872365641657614346><:pb2:871998577717698592><:pb2:871998577717698592><:pb3:871998593039495168>`//
                  if(per >= 40) bar = `<a:pbf1:871999120901029909><a:pbh1:872363339441901588><:pb2:871998577717698592><:pb2:871998577717698592><:pb3:871998593039495168>`
                  if(per >= 50) bar = `<a:pbf1:871999120901029909><a:pbf2:871999177662533763><a:phl2:872365641657614346><:pb2:871998577717698592><:pb3:871998593039495168>`//
                  if(per >= 60) bar = `<a:pbf1:871999120901029909><a:pbf2:871999177662533763><a:pbh1:872363339441901588><:pb2:871998577717698592><:pb3:871998593039495168>`
                  if(per >= 70) bar = `<a:pbf1:871999120901029909><a:pbf2:871999177662533763><a:pbf2:871999177662533763><a:phl2:872365641657614346><:pb3:871998593039495168>`//
                  if(per >= 80) bar = `<a:pbf1:871999120901029909><a:pbf2:871999177662533763><a:pbf2:871999177662533763><a:pbh1:872363339441901588><:pb3:871998593039495168>`
                  if(per >= 90) bar = `<a:pbf1:871999120901029909><a:pbf2:871999177662533763><a:pbf2:871999177662533763><a:pbf2:871999177662533763><a:pbl3:872366029454577664>`
                  if(per >= 100) bar = `<a:pbf1:871999120901029909><a:pbf2:871999177662533763><a:pbf2:871999177662533763><a:pbf2:871999177662533763><a:pbf3:871999189205254154>`
      
                  let bar2 = `<:pb1:871998564849582121><:pb2:871998577717698592><:pb2:871998577717698592><:pb2:871998577717698592><:pb3:871998593039495168>`
      
                  function percentage(partialValue, totalValue) {
                      return (100 * partialValue) / totalValue;
                  }
              
                      const totalActivities2 = 100
                      const doneActivities2 = gameData[tempPlayer].health
                      
                      let per2 = percentage(doneActivities2, totalActivities2)
              
                          if(per2 >= 10) bar2 = `<a:pbl1:872370206192844861><:pb2:871998577717698592><:pb2:871998577717698592><:pb2:871998577717698592><:pb3:871998593039495168>`
                          if(per2 >= 20) bar2 = `<a:phl1:872365651552006217><:pb2:871998577717698592><:pb2:871998577717698592><:pb2:871998577717698592><:pb3:871998593039495168>`
                          if(per2 >= 30) bar2 = `<a:pbf1:871999120901029909><a:phl2:872365641657614346><:pb2:871998577717698592><:pb2:871998577717698592><:pb3:871998593039495168>`//
                          if(per2 >= 40) bar2 = `<a:pbf1:871999120901029909><a:pbh1:872363339441901588><:pb2:871998577717698592><:pb2:871998577717698592><:pb3:871998593039495168>`
                          if(per2 >= 50) bar2 = `<a:pbf1:871999120901029909><a:pbf2:871999177662533763><a:phl2:872365641657614346><:pb2:871998577717698592><:pb3:871998593039495168>`//
                          if(per2 >= 60) bar2 = `<a:pbf1:871999120901029909><a:pbf2:871999177662533763><a:pbh1:872363339441901588><:pb2:871998577717698592><:pb3:871998593039495168>`
                          if(per2 >= 70) bar2 = `<a:pbf1:871999120901029909><a:pbf2:871999177662533763><a:pbf2:871999177662533763><a:phl2:872365641657614346><:pb3:871998593039495168>`//
                          if(per2 >= 80) bar2 = `<a:pbf1:871999120901029909><a:pbf2:871999177662533763><a:pbf2:871999177662533763><a:pbh1:872363339441901588><:pb3:871998593039495168>`
                          if(per2 >= 90) bar2 = `<a:pbf1:871999120901029909><a:pbf2:871999177662533763><a:pbf2:871999177662533763><a:pbf2:871999177662533763><a:pbl3:872366029454577664>`
                          if(per2 >= 100) bar2 = `<a:pbf1:871999120901029909><a:pbf2:871999177662533763><a:pbf2:871999177662533763><a:pbf2:871999177662533763><a:pbf3:871999189205254154>`
   
          let start = new Discord.MessageEmbed()
          .addFields(
              { name: `**${gameData[tempPlayer].member.username}**`, value: `❤ ${bar2} **${gameData[tempPlayer].health}%**`, inline: true },
              { name: `**${gameData[player].member.username}**`, value: `❤ ${bar} **${gameData[player].health}%**`, inline: true },
              { name: `Last Action`, value: `\`Game Starting\`` },
          )
          .setColor('BLUE')
          .setThumbnail('https://cdn.discordapp.com/attachments/855455034187710476/873635167250546698/SeekPng.com_fight-png_1339563.png')
    
        
          let DaBaby = await message.channel.send({content: `${challenger}, You go first`, embeds: [start], components: [row]});
          const gameFilter = m => m.user.id === challenger.id || m.user.id === oppenent.id;
          const gameCollector = DaBaby.createMessageComponentCollector({gameFilter, time: 240000});
      
          gameCollector.on('collect', async (msg) => {
            if (msg.member.id === gameData[player].member.id) {
              if (!checkHealth(player)) {
                const btn = msg.member;

                if (msg.customId === 'P1') {
                    try {
                  await msg.deferUpdate()
                  if(btn.user.id !== gameData[player].member.id) return msg.followUp({content: `${gameData[player].member} Wait for your enemy\'s move...`, ephemeral: true})
                  let randNumb = Math.floor(Math.random() * (30 - 12) + 12);
                  const tempPlayer = (player + 1) % 2;
                  if (gameData[tempPlayer].lastAttack === 'heal') randNumb = Math.floor(randNumb / 2);
                  gameData[tempPlayer].health -= randNumb;
                  gameData[player].lastAttack = 'attack';

    let bar = `<:pb1:871998564849582121><:pb2:871998577717698592><:pb2:871998577717698592><:pb2:871998577717698592><:pb3:871998593039495168>`

    function percentage(partialValue, totalValue) {
        return (100 * partialValue) / totalValue;
    }

        const totalActivities = 100
        const doneActivities = gameData[player].health
        
        let per = percentage(doneActivities, totalActivities)

            if(per >= 10) bar = `<a:pbl1:872370206192844861><:pb2:871998577717698592><:pb2:871998577717698592><:pb2:871998577717698592><:pb3:871998593039495168>`
            if(per >= 20) bar = `<a:phl1:872365651552006217><:pb2:871998577717698592><:pb2:871998577717698592><:pb2:871998577717698592><:pb3:871998593039495168>`
            if(per >= 30) bar = `<a:pbf1:871999120901029909><a:phl2:872365641657614346><:pb2:871998577717698592><:pb2:871998577717698592><:pb3:871998593039495168>`//
            if(per >= 40) bar = `<a:pbf1:871999120901029909><a:pbh1:872363339441901588><:pb2:871998577717698592><:pb2:871998577717698592><:pb3:871998593039495168>`
            if(per >= 50) bar = `<a:pbf1:871999120901029909><a:pbf2:871999177662533763><a:phl2:872365641657614346><:pb2:871998577717698592><:pb3:871998593039495168>`//
            if(per >= 60) bar = `<a:pbf1:871999120901029909><a:pbf2:871999177662533763><a:pbh1:872363339441901588><:pb2:871998577717698592><:pb3:871998593039495168>`
            if(per >= 70) bar = `<a:pbf1:871999120901029909><a:pbf2:871999177662533763><a:pbf2:871999177662533763><a:phl2:872365641657614346><:pb3:871998593039495168>`//
            if(per >= 80) bar = `<a:pbf1:871999120901029909><a:pbf2:871999177662533763><a:pbf2:871999177662533763><a:pbh1:872363339441901588><:pb3:871998593039495168>`
            if(per >= 90) bar = `<a:pbf1:871999120901029909><a:pbf2:871999177662533763><a:pbf2:871999177662533763><a:pbf2:871999177662533763><a:pbl3:872366029454577664>`
            if(per >= 100) bar = `<a:pbf1:871999120901029909><a:pbf2:871999177662533763><a:pbf2:871999177662533763><a:pbf2:871999177662533763><a:pbf3:871999189205254154>`

            let bar2 = `<:pb1:871998564849582121><:pb2:871998577717698592><:pb2:871998577717698592><:pb2:871998577717698592><:pb3:871998593039495168>`

            function percentage(partialValue, totalValue) {
                return (100 * partialValue) / totalValue;
            }
        
                const totalActivities2 = 100
                const doneActivities2 = gameData[tempPlayer].health
                
                let per2 = percentage(doneActivities2, totalActivities2)
        
                    if(per2 >= 10) bar2 = `<a:pbl1:872370206192844861><:pb2:871998577717698592><:pb2:871998577717698592><:pb2:871998577717698592><:pb3:871998593039495168>`
                    if(per2 >= 20) bar2 = `<a:phl1:872365651552006217><:pb2:871998577717698592><:pb2:871998577717698592><:pb2:871998577717698592><:pb3:871998593039495168>`
                    if(per2 >= 30) bar2 = `<a:pbf1:871999120901029909><a:phl2:872365641657614346><:pb2:871998577717698592><:pb2:871998577717698592><:pb3:871998593039495168>`//
                    if(per2 >= 40) bar2 = `<a:pbf1:871999120901029909><a:pbh1:872363339441901588><:pb2:871998577717698592><:pb2:871998577717698592><:pb3:871998593039495168>`
                    if(per2 >= 50) bar2 = `<a:pbf1:871999120901029909><a:pbf2:871999177662533763><a:phl2:872365641657614346><:pb2:871998577717698592><:pb3:871998593039495168>`//
                    if(per2 >= 60) bar2 = `<a:pbf1:871999120901029909><a:pbf2:871999177662533763><a:pbh1:872363339441901588><:pb2:871998577717698592><:pb3:871998593039495168>`
                    if(per2 >= 70) bar2 = `<a:pbf1:871999120901029909><a:pbf2:871999177662533763><a:pbf2:871999177662533763><a:phl2:872365641657614346><:pb3:871998593039495168>`//
                    if(per2 >= 80) bar2 = `<a:pbf1:871999120901029909><a:pbf2:871999177662533763><a:pbf2:871999177662533763><a:pbh1:872363339441901588><:pb3:871998593039495168>`
                    if(per2 >= 90) bar2 = `<a:pbf1:871999120901029909><a:pbf2:871999177662533763><a:pbf2:871999177662533763><a:pbf2:871999177662533763><a:pbl3:872366029454577664>`
                    if(per2 >= 100) bar2 = `<a:pbf1:871999120901029909><a:pbf2:871999177662533763><a:pbf2:871999177662533763><a:pbf2:871999177662533763><a:pbf3:871999189205254154>`

                  let punch1 = new Discord.MessageEmbed()
                  .addFields(
                      { name: `**${gameData[tempPlayer].member.username}**`, value: `❤ ${bar2} **${gameData[tempPlayer].health}%**`, inline: true },
                      { name: `**${gameData[player].member.username}**`, value: `❤ ${bar} **${gameData[player].health}%**`, inline: true },
                      { name: `Last Action`, value: `\`${gameData[player].member.username} lands a punch on ${gameData[tempPlayer].member.username} dealing ${randNumb}%\`` },
                  )
                  .setColor('BLUE')
                  .setThumbnail('https://cdn.discordapp.com/attachments/855455034187710476/873635167250546698/SeekPng.com_fight-png_1339563.png')
                  let punch2 = new Discord.MessageEmbed()
                  .addFields(
                      { name: `**${gameData[tempPlayer].member.username}**`, value: `${gameData[tempPlayer].health}**HP**`, inline: true },
                      { name: `**${gameData[player].member.username}**`, value: `${gameData[player].health}**HP**`, inline: true },
                      { name: `Last Action`, value: `\`${gameData[tempPlayer].member.username} lands a punch on ${gameData[player].member.username} dealing ${randNumb}%\`` },
                  )
                  .setColor('BLUE')
                  .setThumbnail('https://cdn.discordapp.com/attachments/855455034187710476/873635167250546698/SeekPng.com_fight-png_1339563.png')
                  if(gameData[player].member.id == message.author.id){
                    DaBaby.edit({embeds: [punch1], components: [row]});
                  }else if(gameData[player].member.id == opponent.id){
                    DaBaby.edit({embeds: [punch2], components: [row]})
                  }
                  player = (player + 1) % 2;
                } catch (error) {console.log(error)}
                } 
                else if (msg.customId === 'K1') {
                 try {
                  await msg.deferUpdate()
                  if(btn.user.id !== gameData[player].member.id) return msg.followUp({content: `${gameData[player].member} Wait for your enemy\'s move...`, ephemeral: true})
                  let randNumb = Math.floor(Math.random() * 40);
                  let fall = Math.floor(Math.random() * 25);
                  let array = [randNumb, randNumb, fall, fall]
                  let choice = Math.floor(Math.random() * array.length);
                  let str1 = ``
                  const tempPlayer = (player + 1) % 2;
                  if(choice >= 2) gameData[player].health -=fall, str1 = `tried to kick ${gameData[tempPlayer].member.username} but FELL DOWN, took ${fall}% damage`
             
                  if(choice <= 1) gameData[tempPlayer].health -= randNumb, str1 = `lands a kick on ${gameData[tempPlayer].member.username} for ${randNumb}%`
                  gameData[player].lastAttack = 'attack';

                  let bar = `<:pb1:871998564849582121><:pb2:871998577717698592><:pb2:871998577717698592><:pb2:871998577717698592><:pb3:871998593039495168>`

    function percentage(partialValue, totalValue) {
        return (100 * partialValue) / totalValue;
    }

        const totalActivities = 100
        const doneActivities = gameData[player].health
        
        let per = percentage(doneActivities, totalActivities)

            if(per >= 10) bar = `<a:pbl1:872370206192844861><:pb2:871998577717698592><:pb2:871998577717698592><:pb2:871998577717698592><:pb3:871998593039495168>`
            if(per >= 20) bar = `<a:phl1:872365651552006217><:pb2:871998577717698592><:pb2:871998577717698592><:pb2:871998577717698592><:pb3:871998593039495168>`
            if(per >= 30) bar = `<a:pbf1:871999120901029909><a:phl2:872365641657614346><:pb2:871998577717698592><:pb2:871998577717698592><:pb3:871998593039495168>`//
            if(per >= 40) bar = `<a:pbf1:871999120901029909><a:pbh1:872363339441901588><:pb2:871998577717698592><:pb2:871998577717698592><:pb3:871998593039495168>`
            if(per >= 50) bar = `<a:pbf1:871999120901029909><a:pbf2:871999177662533763><a:phl2:872365641657614346><:pb2:871998577717698592><:pb3:871998593039495168>`//
            if(per >= 60) bar = `<a:pbf1:871999120901029909><a:pbf2:871999177662533763><a:pbh1:872363339441901588><:pb2:871998577717698592><:pb3:871998593039495168>`
            if(per >= 70) bar = `<a:pbf1:871999120901029909><a:pbf2:871999177662533763><a:pbf2:871999177662533763><a:phl2:872365641657614346><:pb3:871998593039495168>`//
            if(per >= 80) bar = `<a:pbf1:871999120901029909><a:pbf2:871999177662533763><a:pbf2:871999177662533763><a:pbh1:872363339441901588><:pb3:871998593039495168>`
            if(per >= 90) bar = `<a:pbf1:871999120901029909><a:pbf2:871999177662533763><a:pbf2:871999177662533763><a:pbf2:871999177662533763><a:pbl3:872366029454577664>`
            if(per >= 100) bar = `<a:pbf1:871999120901029909><a:pbf2:871999177662533763><a:pbf2:871999177662533763><a:pbf2:871999177662533763><a:pbf3:871999189205254154>`

            let bar2 = `<:pb1:871998564849582121><:pb2:871998577717698592><:pb2:871998577717698592><:pb2:871998577717698592><:pb3:871998593039495168>`

            function percentage(partialValue, totalValue) {
                return (100 * partialValue) / totalValue;
            }
        
                const totalActivities2 = 100
                const doneActivities2 = gameData[tempPlayer].health
                
                let per2 = percentage(doneActivities2, totalActivities2)
        
                    if(per2 >= 10) bar2 = `<a:pbl1:872370206192844861><:pb2:871998577717698592><:pb2:871998577717698592><:pb2:871998577717698592><:pb3:871998593039495168>`
                    if(per2 >= 20) bar2 = `<a:phl1:872365651552006217><:pb2:871998577717698592><:pb2:871998577717698592><:pb2:871998577717698592><:pb3:871998593039495168>`
                    if(per2 >= 30) bar2 = `<a:pbf1:871999120901029909><a:phl2:872365641657614346><:pb2:871998577717698592><:pb2:871998577717698592><:pb3:871998593039495168>`//
                    if(per2 >= 40) bar2 = `<a:pbf1:871999120901029909><a:pbh1:872363339441901588><:pb2:871998577717698592><:pb2:871998577717698592><:pb3:871998593039495168>`
                    if(per2 >= 50) bar2 = `<a:pbf1:871999120901029909><a:pbf2:871999177662533763><a:phl2:872365641657614346><:pb2:871998577717698592><:pb3:871998593039495168>`//
                    if(per2 >= 60) bar2 = `<a:pbf1:871999120901029909><a:pbf2:871999177662533763><a:pbh1:872363339441901588><:pb2:871998577717698592><:pb3:871998593039495168>`
                    if(per2 >= 70) bar2 = `<a:pbf1:871999120901029909><a:pbf2:871999177662533763><a:pbf2:871999177662533763><a:phl2:872365641657614346><:pb3:871998593039495168>`//
                    if(per2 >= 80) bar2 = `<a:pbf1:871999120901029909><a:pbf2:871999177662533763><a:pbf2:871999177662533763><a:pbh1:872363339441901588><:pb3:871998593039495168>`
                    if(per2 >= 90) bar2 = `<a:pbf1:871999120901029909><a:pbf2:871999177662533763><a:pbf2:871999177662533763><a:pbf2:871999177662533763><a:pbl3:872366029454577664>`
                    if(per2 >= 100) bar2 = `<a:pbf1:871999120901029909><a:pbf2:871999177662533763><a:pbf2:871999177662533763><a:pbf2:871999177662533763><a:pbf3:871999189205254154>`

                    
                  let kick1 = new Discord.MessageEmbed()
                  .addFields(
                    { name: `**${gameData[tempPlayer].member.username}**`, value: `❤ ${bar2} **${gameData[tempPlayer].health}%**`, inline: true },
                    { name: `**${gameData[player].member.username}**`, value: `❤ ${bar} **${gameData[player].health}%**`, inline: true },
                      { name: `Last Action`, value: `\`${gameData[player].member.username} ${str1}\`` },
                  )
                  .setColor('BLUE')
                  .setThumbnail('https://cdn.discordapp.com/attachments/855455034187710476/873635167250546698/SeekPng.com_fight-png_1339563.png')
                  let kick2 = new Discord.MessageEmbed()
                  .addFields(
                    { name: `**${gameData[tempPlayer].member.username}**`, value: `❤ ${bar2} **${gameData[tempPlayer].health}%**`, inline: true },
                    { name: `**${gameData[player].member.username}**`, value: `❤ ${bar} **${gameData[player].health}%**`, inline: true },
                      { name: `Last Action`, value: `\`${gameData[tempPlayer].member.username} ${str1}\`` },
                  )
                  .setColor('BLUE')
                  .setThumbnail('https://cdn.discordapp.com/attachments/855455034187710476/873635167250546698/SeekPng.com_fight-png_1339563.png')
                  if(gameData[player].member.id == message.author.id){
                    DaBaby.edit({embeds: [kick1], components: [row]});
                  }else if(gameData[player].member.id == opponent.id){
                    DaBaby.edit({embeds: [kick2], components: [row]})
                  }
                  player = (player + 1) % 2;
                } catch (err) {console.log(err)}
              
                } 
                    else if (msg.customId === 'D1') {
                  try{
                  await msg.deferUpdate()
                  
                  if(btn.user.id !== gameData[player].member.id) return msg.followUp({content: gameData[player].member + 'Wait for your enemy\'s move...', ephemeral: true})

                  if (gameData[player].health > 80) {
                    return msg.followUp({content: `You already have more than 80% HP`,ephemeral: true}).then(console.log)
                    .catch(console.error);
                  }
  
                  let randrNumb = Math.floor(Math.random() * (20 - 12) + 12);
                  const tempPlayer = (player + 1) % 2;
                  if (gameData[tempPlayer].lastAttack === 'heal') randrNumb = Math.floor(randrNumb / 2);
                  gameData[player].health += randrNumb;
                  gameData[player].lastAttack = 'heal';
                  let heal1 = new Discord.MessageEmbed()
                  .addFields(
                      { name: `**${gameData[tempPlayer].member.username}**`, value: `${gameData[tempPlayer].health}**HP**`, inline: true },
                      { name: `**${gameData[player].member.username}**`, value: `${gameData[tempPlayer].health}**HP**`, inline: true },
                      { name: `Last Action`, value: `\`${gameData[player].member.username} defended and increased their hp by ${randrNumb}\`` },
                  )
                  .setColor('BLUE')
                  .setImage('https://cdn.discordapp.com/attachments/855455034187710476/873635167250546698/SeekPng.com_fight-png_1339563.png')
      
                  let heal2 = new Discord.MessageEmbed()
                  .addFields(
                      { name: `**${gameData[tempPlayer].member.username}**`, value: `${gameData[tempPlayer].health}**HP**`, inline: true },
                      { name: `**${gameData[player].member.username}**`, value: `${gameData[tempPlayer].health}**HP**`, inline: true },
                      { name: `Last Action`, value: `\`${gameData[tempPlayer].member.username} defended and increased their hp by ${randrNumb}\`` },
                  )
                  .setColor('BLUE')
                  .setImage('https://cdn.discordapp.com/attachments/855455034187710476/873635167250546698/SeekPng.com_fight-png_1339563.png')
                  if(gameData[player].member.id == message.author.id){
                    DaBaby.edit({embeds: [heal1], component: [row]});
                  }else if(gameData[player].member.id == opponent.id){
                    DaBaby.edit({embeds: [heal2], component: [row]});
                  }
                  player = (player + 1) % 2;
                } catch (err) {console.log(err)}
                } else if (msg.customId === 'C1') {
  
                  await msg.deferUpdate()
                  if(btn.user.id !== gameData[player].member.id) return msg.followUp({content: gameData[player].member + 'Wait for your enemy\'s move...', ephemeral: true})
                   btn1 = new MessageButton()
                  .setLabel('Punch')
                  .setCustomId('P1')
                  .setStyle('PRIMARY')
                  .setDisabled()
                   btn2 = new MessageButton()
                  .setLabel('Defend')
                  .setCustomId('D1')
                  .setStyle('SUCCESS')
                  .setDisabled()
                   btn3 = new MessageButton()
                  .setLabel('Cancel')
                  .setCustomId('C1')
                  .setStyle('DANGER')
                  .setDisabled()
                   btn4 = new MessageButton()
                  .setLabel('Kick')
                  .setCustomId('K1')
                  .setStyle('PRIMARY')
                  .setDisabled()
                   row = new MessageActionRow()
                  .addComponents(btn1, btn4, btn2, btn3)
                  gameCollector.stop()
                  DaBaby.edit({content: `Game stopped.`, components: [row]})
                  
                } 
      
                if (checkHealth(player)) {
                  msg.deferUpdate()
                  btn1 = new MessageButton()
                  .setLabel('Punch')
                  .setCustomId('P1')
                  .setStyle('PRIMARY')
                  .setDisabled()
                   btn2 = new MessageButton()
                  .setLabel('Defend')
                  .setCustomId('D1')
                  .setStyle('SUCCESS')
                  .setDisabled()
                   btn3 = new MessageButton()
                  .setLabel('Cancel')
                  .setCustomId('C1')
                  .setStyle('DANGER')
                  .setDisabled()
                  btn4 = new MessageButton()
                  .setLabel('Kick')
                  .setCustomId('K1')
                  .setStyle('PRIMARY')
                  .setDisabled()
                   row = new MessageActionRow()
                  .addComponents(btn1, btn4, btn2, btn3)

                  gameCollector.stop();
                  const tempPlayer = (player + 1) % 2;
                  let win1 = new Discord.MessageEmbed()
                  .addFields(
                      { name: `**${gameData[tempPlayer].member.username}**`, value: `${gameData[tempPlayer].health}**HP**`, inline: true },
                      { name: `**${gameData[player].member.username}**`, value: `${gameData[tempPlayer].health}**HP**`, inline: true },
                      { name: `Last Action`, value: `\`${gameData[tempPlayer].member} has won the game!\`` },
                  )
                  .setColor('BLUE')
    
                  DaBaby.edit({embeds: [win1], components: [row]});
                }
              } else {
  
                  msg.deferUpdate()
                  btn1 = new MessageButton()
                  .setLabel('Punch')
                  .setCustomId('P1')
                  .setStyle('PRIMARY')
                  .setDisabled()
                   btn2 = new MessageButton()
                  .setLabel('Defend')
                  .setCustomId('D1')
                  .setStyle('SUCCESS')
                  .setDisabled()
                   btn3 = new MessageButton()
                  .setLabel('Cancel')
                  .setCustomId('C1')
                  .setStyle('DANGER')
                  .setDisabled()
                   btn4 = new MessageButton()
                  .setLabel('Kick')
                  .setCustomId('K1')
                  .setStyle('PRIMARY')
                  .setDisabled()
                   row = new MessageActionRow()
                  .addComponents(btn1, btn4, btn2, btn3)
                  gameCollector.stop();
                  const tempPlayer = (player + 1) % 2;
                  let win2 = new Discord.MessageEmbed()
                  .addFields(
                      { name: `**${gameData[tempPlayer].member.username}**`, value: `${gameData[tempPlayer].health}**HP**`, inline: true },
                      { name: `**${gameData[player].member.username}**`, value: `${gameData[tempPlayer].health}**HP**`, inline: true },
                      { name: `Last Action`, value: `\`${gameData[tempPlayer].member} defended\`` },
                  )
                  .setColor('BLUE')
                  DaBaby.edit({embeds: [win2], components: [row]});
              }
            
            }
          });
        } catch(error) {
            console.log(error)
        }
        }  
      } 

    
  