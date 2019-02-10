const Discord = require("discord.js");

module.exports.run = async (bot, message, args, sql) => {
    sql.query(`SELECT * FROM \`${message.guild.id}\``, [], function(err, result) {
        if(err) {
            console.log(err);
            return message.channel.send("An error has occured");
        }

        let global = [];

        result.sort(function(a, b) {
          return a.xp + b.xp;
        });

        for(let i = 0; i < 10; i++) {
            if(!result[i]) continue;
            global[i] = result[i];
        }

        var embed = new Discord.RichEmbed()
        .setTitle("Leaderboards")
        .setDescription(global.map((x, i) => `**[${i + 1}]** - ${message.guild.members.find(u => u.id == x.id).user.tag}, ${x.xp}xp`));

        return message.channel.send(embed);
    });
}

module.exports.help = {
    name: "leaderboards",
    alias: "leaders"
}