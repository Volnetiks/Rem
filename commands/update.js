const Discord = require("discord.js");
const { exec } = require("child_process")

module.exports.run = async (bot, message, args, sql) => {
    if(message.author.id === "283164429619691520") {
        const embed = new Discord.RichEmbed()
            embed.setTitle('Output');
            embed.setColor('#BA55D3');
            exec('git pull origin master', (error, stdout, stderr) => {
                if (error) {embed.setDescription('```' + error + '```'); console.log(error);}
                else if (stdout.includes('Already up to date')) {embed.setDescription('Bot already up to date!');}
                else embed.setDescription('```Stdout: ' + stdout + ' stderr: ' + stderr + '```');
                message.channel.send(embed);
            });
        message.channel.send(embed);
    }
}

module.exports.help = {
    name: "update"
}