const Discord = require("discord.js");
const ytdl = require("ytdl-core");
var servers = {};
const { get } = require("https");

module.exports.run = async (bot, message, args, sql) => {
    const voiceConnection = bot.voiceConnections.find(val => val.channel.guild.id == message.guild.id);
        if(!message.member.voiceChannel){
            return message.reply("You are not in a channel");
        }
        if(!voiceConnection){
            return message.reply("I'm not playing any songs");
        }
        if(!bot.servers[message.guild.id] || bot.servers[message.guild.id].queue.length < 1){
            return message.reply("There is no song after");
        }
        var dispatcher = voiceConnection.player.dispatcher;
        return dispatcher.end();

}

module.exports.help = {
    name: "skip"
}