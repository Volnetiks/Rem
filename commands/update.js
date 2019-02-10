const Discord = require("discord.js");
const { exec } = require("child_process")

module.exports.run = async (bot, message, args, sql) => {
    if(message.author.id === "283164429619691520") {
        const embed = new Discord.RichEmbed()
        .setTitle("Update")
        .setColor("#00c7ff")
        exec('git pull origin master', (error, stdout, stderr) => {
            if(error) {
                embed.setDescription('```' + `An error has occured: ${error}` + '```')
            } else if (stdout.includes("Already up-to-date")) {
                embed.setDescription("The bot is already up-to-date")
            } else {
                embed.setDescription('```Out: ' + stdout + ' Err: ' + stderr + '```')
            }
            message.channel.send(embed);
        })
    }
}

module.exports.help = {
    name: "update"
}