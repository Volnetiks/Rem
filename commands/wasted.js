const Discord = require("discord.js");

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

module.exports.run = async (bot, message, args, sql) => {
    if(!args[0]) {
        let value = getRandomInt(5);
        let link;
        if(value == 0) {
            link = "https://cdn.weeb.sh/images/B1VnoJFDZ.gif";
        } else if (value == 1) {
            link = "https://cdn.weeb.sh/images/HyXTiyKw-.gif";
        } else if (value == 2) {
            link = "https://cdn.weeb.sh/images/r11as1tvZ.gif";
        } else if (value == 3) {
            link = "https://cdn.weeb.sh/images/B1qosktwb.gif";
        } else {
            link = "https://cdn.weeb.sh/images/BJO2j1Fv-.gif";
        }
        let hugEmbed = new Discord.RichEmbed()
        .setTitle(`WASTED`)
        .setDescription(`${message.author} got wasted`)
        .setImage(link);

        return message.channel.send(hugEmbed);
    } else {
        let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        let value = getRandomInt(5);
        let link;
        if(value == 0) {
            link = "https://cdn.weeb.sh/images/B1VnoJFDZ.gif";
        } else if (value == 1) {
            link = "https://cdn.weeb.sh/images/HyXTiyKw-.gif";
        } else if (value == 2) {
            link = "https://cdn.weeb.sh/images/r11as1tvZ.gif";
        } else if (value == 3) {
            link = "https://cdn.weeb.sh/images/B1qosktwb.gif";
        } else {
            link = "https://cdn.weeb.sh/images/BJO2j1Fv-.gif";
        }
        let hugEmbed = new Discord.RichEmbed()
        .setTitle(`WASTED`)
        .setDescription(`${user} got wasted by ${message.author}`)
        .setImage(link);

        return message.channel.send(hugEmbed);
    }
}

module.exports.help = {
    name: "wasted"
}