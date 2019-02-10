const Discord = require("discord.js");

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

module.exports.run = async (bot, message, args, sql) => {
    if(!args[0] && !args[1]) {
        let value = getRandomInt(5);
        let link;
        if(value == 0) {
            link = "https://cdn.weeb.sh/images/Hy-oQl91z.gif";
        } else if (value == 1) {
            link = "https://cdn.weeb.sh/images/ryFdQRtF-.gif";
        } else if (value == 2) {
            link = "https://cdn.weeb.sh/images/SJn43adDb.gif";
        } else if (value == 3) {
            link = "https://cdn.weeb.sh/images/SJQRoTdDZ.gif";
        } else {
            link = "https://cdn.weeb.sh/images/ry9uXAFKb.gif";
        }
        let hugEmbed = new Discord.RichEmbed()
        .setTitle(`Kiss`)
        .setColor("#00c7ff")
        .setDescription(`Kissing yourself ${message.author}? Sorry...`)
        .setImage(link);

        return message.channel.send(hugEmbed);
    } else {
        let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!user) user = message.guild.member(message.guild.members.get(args[1]));
        let value = getRandomInt(5);
        let link;
        if(value == 0) {
            link = "https://cdn.weeb.sh/images/Hy-oQl91z.gif";
        } else if (value == 1) {
            link = "https://cdn.weeb.sh/images/ryFdQRtF-.gif";
        } else if (value == 2) {
            link = "https://cdn.weeb.sh/images/SJn43adDb.gif";
        } else if (value == 3) {
            link = "https://cdn.weeb.sh/images/SJQRoTdDZ.gif";
        } else {
            link = "https://cdn.weeb.sh/images/ry9uXAFKb.gif";
        }
        let hugEmbed = new Discord.RichEmbed()
        .setTitle(`Kiss`)
        .setColor("#00c7ff")
        .setDescription(`${message.author} is kissing ${user}, they are so cute`)
        .setImage(link);

        return message.channel.send(hugEmbed);
    }
}

module.exports.help = {
    name: "kiss"
}