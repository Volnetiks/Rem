const Discord = require("discord.js");
const sqlFunction = require("../utils/sqlFunction.js");
const emojiRegex = require("emoji-regex");
const regex = emojiRegex();

module.exports.run = async (bot, message, args, sql) => {

    if(args[0]) {
        sql.query(`SELECT wedding FROM users WHERE id = ?`, [message.author.id], function(err, result) {
            if(err) throw err;
            if(result[0].wedding != "Not married") return message.reply("You are already married. You can use /divorced");
            let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
            if (!user) return message.channel.send("The user dont exist!");

            const filter = m => m.author.id === user.user.id;
            let match;
            let userP = user.user.tag;
            let authorP = message.author.tag;
            while (match = regex.exec(user.user.tag)) {
                const emoji = match[0];
                userP.replace(emoji, "");
            }
            let match2;
            while (match2 = regex.exec(message.author.tag)) {
                const emoji2 = match2[0];
                authorP.replace(emoji2, "");
            }

            message.channel.send(`${user} do you want to be married with ${message.author}? (yes/no)`);
            message.channel.awaitMessages(filter, { max: 1, time: 10000 }).then(collected => {
                let answer = collected.first().content;

                if (answer === "yes") {
                    sqlFunction.weedingAccept(user, message, sql, authorP, userP);
                } else if (answer === "no") {
                    return message.reply(`${user} dont wont to be married with you!`);
                } else {
                    return message.channel.send("This is not a good answer! Please try again.");
                }
            });
        });
    } else {
        sql.query(`SELECT wedding FROM users WHERE id = ?`, [message.author.id], function(err, result) {
            if(err) return message.channel.send("An error has occured.");
    
            if(result[0].wedding === "Not married") {
                return message.reply("You are not married.");
            } else {
                return message.reply(`You are married to ${result[0].wedding}`);
            }
        })
    }
}

module.exports.help = {
    name: "wedding"
}