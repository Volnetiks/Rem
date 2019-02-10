const Discord = require("discord.js");
const regexUrl = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|png)/g;
const Jimp = require("jimp");

module.exports.run = async (bot, message, args, sql) => {
    if(!args[0]) {
        return message.reply("Please, specify a link");
    }
    
    if(args[0].match(regexUrl)) {
        sql.query(`UPDATE users SET bProfile = ? WHERE id = ?`, [args[0], message.author.id], function(err) {
            if(err) console.log(err);

            let bEmbed = new Discord.RichEmbed()
            .setTitle("Background Profile Update")
            .setDescription("Your background profile has been update to")
            .setImage(args[0]);
            return message.channel.send(bEmbed);
        });
    } else {
        return message.reply("Please, specify an image link.");
    }
}

module.exports.help = {
    name: "backgroundProfile"
}