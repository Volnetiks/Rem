const Discord = require("discord.js");
const { exec } = require("child_process")

module.exports.run = async (bot, message, args, sql) => {
    if(message.author.id === "283164429619691520") {
        message.channel.send("Restarting...").then(message => {
            process.exit(0);
        })
    }
}

module.exports.help = {
    name: "restart"
}