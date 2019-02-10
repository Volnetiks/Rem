const Discord = require("discord.js");
const sqlFunction = require("../utils/sqlFunction.js");

module.exports.run = async (bot, message, args, sql) => {

    if(!message.member.hasPermission("MANAGE_ROLES")) return message.reply("You can't do that!");
    if(!args[0]) return message.reply("You didn't specify a role");

    let role = message.guild.roles.find(`name`, args[0]);
    if(!role) return message.reply(`The role ${args[0]} dont exist!`);

    sql.query(`SELECT * FROM server WHERE id = ?`, message.guild.id, function(err, result) {
        if(err) return message.channel.send("An error has occured, please try again.");

        if(!result[0]) {
            sqlFunction.createServerMessage(message, sql);
        }

        sql.query(`UPDATE server SET dRole = ? WHERE id = ?`, [role.name, message.guild.id], function(err) {
            if(err) return message.channel.send("An error has occured, please try again later.");

            let rEmbed = new Discord.RichEmbed()
            .setColor("#00c7ff")
            .setTitle("Default Role Update")
            .setDescription(`Default Role Set To ${args[0]}`);

            return message.channel.send(rEmbed);
        });
    });

}

module.exports.help = {
    name: "defaultRole"
}