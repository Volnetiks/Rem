const Discord = require("discord.js");
const fs = require("fs");
const sqlFunction = require("../utils/sqlFunction.js");

module.exports.run = async (bot, message, args, sql) => {

    if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.reply("You cant do this!");
    if(!args[0]) return message.reply("Usage: ==welcome <channel>");

    if(args[0] === "message") {
        if(args[1] === "join") {
            if(!args[2]) return message.reply("Usage: v!welcome message join <message>");

            const messageeeeeeeeeeee = args.join(" ").slice(13);

            sql.query(`SELECT * FROM server WHERE id = ?`, message.guild.id, function(err, result) {
                if(err) return message.channel.send("An error has occured, please try again");

                if(!result[0]) {
                    sqlFunction.createServerMessage(message, sql);
                }

                sql.query(`UPDATE server SET wMessage = ? WHERE id = ?`, [messageeeeeeeeeeee, message.guild.id], function(err) {
                    if(err) return message.channel.send("An error has occured while updating the message, please try again");

                    let mEmbed = new Discord.RichEmbed()
                    .setColor("#00c7ff")
                    .setTitle("Welcome Message Set")
                    .setDescription(`Set to ${messageeeeeeeeeeee}`);

                    return message.channel.send(mEmbed);
                });
            });

            return;
        } else if(args[1] === "leave") {
            if(!args[2]) return message.reply("Usage: v!welcome message leave <message>");

            const messageeeeeeeeeeee = args.join(" ").slice(13);

            sql.query(`SELECT * FROM server WHERE id = ?`, message.guild.id, function(err, result) {
                if(err) return message.channel.send("An error has occured, please try again");

                if(!result[0]) {
                    sqlFunction.createServerMessage(message, sql);
                }

                sql.query(`UPDATE server SET lMessage = ? WHERE id = ?`, [messageeeeeeeeeeee, message.guild.id], function(err) {
                    if(err) return message.channel.send("An error has occured while updating the message, please try again");

                    let mEmbed = new Discord.RichEmbed()
                    .setColor("#00c7ff")
                    .setTitle("Leave Message Set")
                    .setDescription(`Set to ${messageeeeeeeeeeee}`);

                    return message.channel.send(mEmbed);
                });
            });
            return;
        }
    }

    let channel = message.guild.channels.find(`name`, args[0]);
    if(!channel) return message.reply("This channel was not found!");

    sql.query(`SELECT * FROM server WHERE id = ?`, message.guild.id, function(err, result) {
        if(err) return message.channel.send("An error has occured, please try again");

        if(!result[0]) {
            sqlFunction.createServerMessage(message, sql);
        }

        sql.query(`UPDATE server SET cMessage = ? WHERE id = ?`, [args[0], message.guild.id], function(err) {
            if(err) return message.channel.send("An error has occured while updating the channel, please try again");

            let wEmbed = new Discord.RichEmbed()
            .setColor("#00c7ff")
            .setTitle("Welcome Channel Set!")
            .setDescription(`Set to ${args[0]}`);

            return message.channel.send(wEmbed);
        });
    });
    return;
}

module.exports.help = {
    name: "welcome"
}