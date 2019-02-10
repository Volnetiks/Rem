const Discord = require("discord.js");
const fs = require("fs");
const sqlFunction = require("../utils/sqlFunction.js");

module.exports.run = async (bot, message, args, sql) => {
    if(!args[0]) return message.reply("Please, tell me the question.");

    const filter = m => m.author.id === message.author.id;
    message.reply("Now, tell me the answer");
    message.channel.awaitMessages(filter, {max: 1, timer: 10000}).then(collected => {
        let answer = collected.first().content;
        sql.query(`SELECT prefix FROM server WHERE id = ?`, message.guild.id, function(err, result) {
            if(err) throw err;
            let prefixes = result[0].prefix;
            let question = message.content.slice(prefixes.length + 6);

            sql.query(`SELECT question FROM question WHERE id = ?`, [message.author.id], function(err, result) {
                if(err) return console.log(err);

                for(let i = 0; i < result.length; i++) {
                    if(result[i].question === question) {
                        return message.reply("I already learned that!");
                    }
                }

                sqlFunction.addQuestion(question, answer, message.author, sql);

                return message.reply("I learned the question!");
            });
        });
    })

}

module.exports.help = {
    name: "learn"
}