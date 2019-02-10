const Discord = require("discord.js");
const osuApi = require('osu-api');
const osu = new osuApi.Api('c80d0520fb8d5cf5bff53ed30825598ce4b6f175');

module.exports.run = async (bot, message, args, sql) => {

    if(!args[0]) {
        const filter = m => m.author.id === message.author.id;
        message.channel.send("Please, enter player name.")
        message.channel.awaitMessages(filter, {max: 1}).then(collected => {
            let user = collected.first().content;

            osu.getUser(user, (err, user) => {
                if(err) throw err;
                if(!user) return message.reply("This user dont exist!")

                let oEmbed = new Discord.RichEmbed()
                .setTitle(`Osu! profile for ${user.username}`)
                .setDescription(`A: ${user.count_rank_a} | S: ${user.count_rank_s} | S+: ${user.count_rank_sh} | SS: ${user.count_rank_ss} | SS+: ${user.count_rank_ssh}`)
                .setColor("#00c7ff")
                .addField("User", `${user.username} (${user.country})`, true)
                .addField("PlayCount | Level", `${user.playcount} | ${Math.round(user.level)}`, true)
                .addField("Ranked | Total Scores", `${user.ranked_score} | ${user.total_score}`, true)
                .addField("Rank | Country Rank", `${user.pp_rank} | ${user.pp_country_rank}`, true)
                .addField("PP | Accuracy", `${Math.round(user.pp_raw)} | ${Math.round(user.accuracy * 100) / 100}%`, true)
                .addField("Profile", `[Url Here](https://osu.ppy.sh/users/${user.user_id})`, true);

                return message.channel.send(oEmbed);
            });
        });
    } else {
        let user = args[0];

        osu.getUser(user, (err, user) => {
            if(err) throw err;
            if(!user) return message.reply("This user dont exist!")

            let oEmbed = new Discord.RichEmbed()
            .setTitle(`Osu! profile for ${user.username}`)
            .setDescription(`A: ${user.count_rank_a} | S: ${user.count_rank_s} | S+: ${user.count_rank_sh} | SS: ${user.count_rank_ss} | SS+: ${user.count_rank_ssh}`)
            .setColor("#00c7ff")
            .addField("User", `${user.username} (${user.country})`, true)
            .addField("PlayCount | Level", `${user.playcount} | ${Math.round(user.level)}`, true)
            .addField("Ranked | Total Scores", `${user.ranked_score} | ${user.total_score}`, true)
            .addField("Rank | Country Rank", `${user.pp_rank} | ${user.pp_country_rank}`, true)
            .addField("PP | Accuracy", `${Math.round(user.pp_raw)} | ${Math.round(user.accuracy * 100) / 100}%`, true)
            .addField("Profile", `[Url Here](https://osu.ppy.sh/users/${user.user_id})`, true);

            return message.channel.send(oEmbed);
        });
    }

}

module.exports.help = {
    name: "osu"
}