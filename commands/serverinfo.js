const Discord = require("discord.js");

module.exports.run = async (bot, message, args, sql) => {

    let bEmbed = new Discord.RichEmbed()
    .setColor("#00c7ff")
    .setThumbnail(message.guild.iconURL)
    .addField("Server Name", message.guild.name)
    .addField("Member Count", message.guild.memberCount)
    .addField("Server Owner", message.guild.owner.user.username)
    .addField("Server Id", message.guild.id)
    .addField("Server Created At", `${message.guild.createdAt.getDate()}/${message.guild.createdAt.getMonth()}/${message.guild.createdAt.getFullYear()}`);

    return message.channel.send(bEmbed);
}

module.exports.help = {
    name: "serverinfo"
}