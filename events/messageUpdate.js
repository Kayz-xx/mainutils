
module.exports.run = (client, oldMessage, newMessage) => {

    let snipes = client.snipes.get(newMessage.channel.id) || []

    snipes.unshift({
        msg: newMessage,
        image: newMessage.attachments.first()?.proxyURL || null,
        time: Date.now(),
        type: 'Message Edited'
    })

    client.snipes.set(newMessage.channel.id, snipes)
 
}
