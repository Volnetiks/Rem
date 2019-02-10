const Discord = require("discord.js");

module.exports.run = async (bot, message, args, sql) => {
    message.channel.send("Ping: Calculating...").then(function(newMessage) {
        newMessage.edit(newMessage.content.replace("Calculating...", ((newMessage.createdTimestamp - message.createdTimestamp) / 10) + ' ms'));
    });

    return;
}

module.exports.help = {
    name: "ping"
}