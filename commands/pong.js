exports.run = (client, message, args, prefix) => {
    message.channel.send("pong!").catch(console.error);
}
