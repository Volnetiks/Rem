const Discord = require("discord.js");

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

module.exports.run = async (bot, message, args, sql) => {
    if(!args[0] && !args[1]) {
        let value = getRandomInt(5);
        let link;
        if(value == 0) {
            link = "https://images-ext-1.discordapp.net/external/iYOTMwzM8SAFzhx4JoSFGRpSdSN75hF3454lyxc-wOw/https/cdn.weeb.sh/images/r1kC_dQPW.gif";
        } else if (value == 1) {
            link = "https://cdn.weeb.sh/images/B10Tfknqf.gif";
        } else if (value == 2) {
            link = "https://cdn.weeb.sh/images/Hyec_OmDW.gif";
        } else if (value == 3) {
            link = "https://media.giphy.com/media/wSY4wcrHnB0CA/giphy.gif";
        } else {
            link = "https://images-ext-1.discordapp.net/external/PDpYIi07VOBExcTswU0ETtxLSF_QVQ6YaHr_4Dvm1Nc/https/cdn.weeb.sh/images/BkHA_O7v-.gif";
        }
        let hugEmbed = new Discord.RichEmbed()
        .setTitle(`Hug`)
        .setColor("#00c7ff")
        .setDescription(`There you go ${message.author}`)
        .setImage(link);

        return message.channel.send(hugEmbed);
    } else {
        let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!user) user = message.guild.member(message.guild.members.get(args[1]));
        let value = getRandomInt(5);
        let link;
        if(value == 0) {
            link = "https://images-ext-1.discordapp.net/external/iYOTMwzM8SAFzhx4JoSFGRpSdSN75hF3454lyxc-wOw/https/cdn.weeb.sh/images/r1kC_dQPW.gif";
        } else if (value == 1) {
            link = "https://cdn.weeb.sh/images/B10Tfknqf.gif";
        } else if (value == 2) {
            link = "https://cdn.weeb.sh/images/Hyec_OmDW.gif";
        } else if (value == 3) {
            link = "https://media.giphy.com/media/wSY4wcrHnB0CA/giphy.gif";
        } else {
            link = "https://images-ext-1.discordapp.net/external/PDpYIi07VOBExcTswU0ETtxLSF_QVQ6YaHr_4Dvm1Nc/https/cdn.weeb.sh/images/BkHA_O7v-.gif";
        }
        let hugEmbed = new Discord.RichEmbed()
        .setTitle(`Hug`)
        .setColor("#00c7ff")
        .setDescription(`${message.author} has hugged ${user}`)
        .setImage(link);

        return message.channel.send(hugEmbed);
    }
}

module.exports.help = {
    name: "hug"
}