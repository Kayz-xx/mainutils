
module.exports.run = (client, oldMessage, newMessage) => {
    if(newMessage.author.bot) return;
    let snipes = client.snipes.get(newMessage.channel.id) || []
    if(snipes.size > 100 || snipes.length > 100) {
        snipes = snipes.slice(0, 50)
    }
    snipes.unshift({
        msg: newMessage,
        image: newMessage.attachments.first()?.proxyURL || null,
        time: Date.now(),
        type: 'Message Edited'
    })

    client.snipes.set(newMessage.channel.id, snipes)
 
}
