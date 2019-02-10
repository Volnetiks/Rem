const Discord = require("discord.js");
const ytdl = require("ytdl-core");
const { get } = require("https");

module.exports.run = async (bot, message, args, sql) => {
    const voiceConnection = bot.voiceConnections.find(val => val.channel.guild.id == message.guild.id);
    if(!message.member.voiceChannel){
        return message.reply("You are not in a channel");
    }
    if(!voiceConnection){
        return message.reply("I'm not playing any song!");
    }
    var dispatcher = voiceConnection.player.dispatcher;
    bot.servers[message.guild.id].queue = [];
    dispatcher.end();
}

module.exports.help = {
    name: "stop"
}