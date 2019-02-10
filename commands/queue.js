const Discord = require("discord.js");
const ytdl = require("ytdl-core")

function getSongName(link) {
    ytdl.getInfo(link, (err, info) => {
        if(err) console.log(err);

        return info.title;
    })
}

module.exports.run = async (bot, message, args, sql) => {
    const voiceConnection = bot.voiceConnections.find(val => val.channel.guild.id == message.guild.id);
    if(!voiceConnection){
        return message.reply("I'm not playing any song!");
    }
    if(!bot.servers[message.guild.id] || bot.servers[message.guild.id].queue.length < 1){
        return message.reply("There is no song after!");
    }
    var msg = new Discord.RichEmbed()
            .setAuthor(message.author.tag + " - Queue List")
            .setDescription(bot.servers[message.guild.id].queue.map((m, i) => `${i+1} - ${m.name} de ${m.author} | ${m.time}`).join("\n\n"))
            .setThumbnail(bot.servers[message.guild.id].queue[0].img)
            .setColor("#00c7ff")
    return message.channel.send(msg);

}

module.exports.help = {
    name: "queue"
}