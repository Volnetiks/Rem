const Discord = require("discord.js");
const fs = require("fs");
const sqlFunction = require("../utils/sqlFunction.js");

module.exports.run = async (bot, message, args, sql) => {
    if(!args[0]) return message.reply("Please, specify a note");

    let note = args.join(" ");

    sql.query(`SELECT * FROM users WHERE id = ?`, message.author.id, function(err, result) {
        if(err) return message.channel.send("An error has occured, please try again");

        if(!result[0]) {
            sqlFunction.createAccountInUsersAuthor(message.author, message, sql);
        }

        sql.query(`UPDATE users SET note = ? WHERE id = ?`, [note, message.author.id], function(err) {
            if(err) return message.channel.send("An error has occured while updating your account, please try again.");

            let embed = new Discord.RichEmbed()
            .setColor("#00c7ff")
            .setTitle("Profile Note")
            .setDescription(`Note set to ${note}`);

            return message.channel.send(embed);
        })
    });
}

module.exports.help = {
    name: "profileNote"
}