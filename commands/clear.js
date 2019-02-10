const Discord = require("discord.js");

module.exports.run = async (bot, message, args, sql) => {

  if(message.member.hasPermission("MANAGE_MESSAGES") || message.author.id === "283164429619691520") {
      if(!args[0]) return message.reply("Give me a number of message");
      if(isNaN(args[0])) return message.reply("Please, specify a number");
      message.channel.bulkDelete(++args[0]).then(() => {
          message.channel.send(`Clear ${--args[0]} messages.`).then(msg => msg.delete(2000));
      });
  }
}

module.exports.help = {
  name: "clear"
}