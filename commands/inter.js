const Discord = require("discord.js");

module.exports.run = async (bot, message, args, sql) => {
    if(!args[0]) return message.reply("Specify an guild id and a message");
    if(!args[1]) return message.reply("Please specify a message.");

    let guildName = args.join(" ");
    let guild = bot.guilds.find(g => g.name === guildName);
    if (!guild) return message.reply("I cant find this guild! Please, check name, and check if i'm in the guild");
    bot.inter[message.author.id] = guildName; 
    message.reply("You interchat has been changed!");
}

module.exports.help = {
    name: "inter"
}