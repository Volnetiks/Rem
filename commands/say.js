const Discord = require("discord.js");

module.exports.run = async (bot, message, args, sql) => {

    if(message.member.hasPermission("ADMINISTRATOR") || message.member.id === "283164429619691520") {
        const sayMessage = args.join(" ");
        message.delete().catch();
        message.channel.send(sayMessage);
        return;
    } else {
        return message.reply("You can't do that.")
    }
}

module.exports.help = {
  name: "say"
}