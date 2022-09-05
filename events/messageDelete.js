module.exports.run = (client, message) => {
  if (message?.author?.bot) return;
  let snipes = client.snipes.get(message.channel.id) || [];
  if (snipes.size > 50 || snipes.length > 50) {
    snipes = snipes.slice(0, 50);
  }

  snipes.unshift({
    msg: message,
    image: message.attachments.first()?.proxyURL || null,
    time: Date.now(),
    type: "Message Deleted",
  });

  client.snipes.set(message.channel.id, snipes);
};
