
module.exports.run = (client, oldMessage, newMessage) => {
    if (newMessage?.author?.bot) return
    let snipes = client.snipes.get(oldMessage.channel.id) || []

    snipes.unshift({
        oldContent: oldMessage.content,
        newContent: newMessage.content,
        editedIn: newMessage.createdAt - oldMessage.editedAt,
        msg: newMessage,
        time: oldMessage.createdAt,
        type: 'Message Edited'
    })

    client.snipes.set(oldMessage.channel.id, snipes)
}
