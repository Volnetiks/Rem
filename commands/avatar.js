const Discord = require("discord.js");

module.exports.run = async (bot, message, args, sql) => { 

    if(args.length === 0) {
        let embed = new Discord.RichEmbed()
        .setColor("#00c7ff")
        .setTitle(`Avatar of ${message.author.username}`)
        .setImage(message.author.displayAvatarURL);

        return message.channel.send(embed);
    } else {
        let aUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(aUser) {
            let embed = new Discord.RichEmbed()
            .setColor("#00c7ff")
            .setTitle(`Avatar`)
            .setDescription(`Avatar of ${aUser.user.username}`)
            .setImage(aUser.user.displayAvatarURL);

            return message.channel.send(embed);
        } else {
            message.reply("The user don't exist!");
        }
    }
}

module.exports.help = {
    name: "avatar"
}