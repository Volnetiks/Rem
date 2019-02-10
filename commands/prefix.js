const Discord = require("discord.js");
const fs = require("fs");
const sqlFunction = require("../utils/sqlFunction.js");

module.exports.run = async (bot, message, args, sql) => {

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You cant do this!");
    if(!args[0]) return message.reply("Usage: ==prefix <new prefix>");

    sql.query(`SELECT * FROM server WHERE id = ?`, message.guild.id, function(err, result) {

        if(!result[0]) {
            sqlFunction.createServerMessage(message, sql);
        }

        sql.query(`UPDATE server SET prefix = ? WHERE id = ?`, [args[0], message.guild.id], function(err) {
            if(err) return message.channel.send("An error has occured, please try again");

            let sEmbed = new Discord.RichEmbed()
            .setColor("#00c7ff")
            .setTitle("Prefix set!")
            .setDescription(`Set to ${args[0]}`);

            return message.channel.send(sEmbed);
        });
    });
    return;
}

module.exports.help = {
    name: "prefix"
}