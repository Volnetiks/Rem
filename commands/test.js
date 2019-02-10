const Discord = require("discord.js");

module.exports.run = async (bot, message, args, sql) => {
    message.channel.send("Patate");
    message.channel.send("Banane")
    return;
}

module.exports.help = {
    name: "test"
}