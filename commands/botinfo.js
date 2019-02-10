const Discord = require("discord.js");

module.exports.run = async (bot, message, args, sql) => {

    let bEmbed = new Discord.RichEmbed()
    .setTitle("Bot Information")
    .setColor("#00c7ff")
    .setThumbnail(bot.user.avatarURL)
    .addField("Name:", bot.user.username)
    .addField("Bot Developped By:", "Volnetiks#0101")
    .addField("Bot Created At:", bot.user.createdAt)
    .addField("Cpu Used", `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024 * 100) / 100 + " Mb/s"}`);

    return message.channel.send(bEmbed);
}

module.exports.help = {
    name: "botinfo"
}