const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

module.exports = {
    name: "report",
    category: "moderation",
    description: "Report a server member",
    usage: "<mention/id>",
    run: async (client, message, args) => {
        if(message.deletable) message.delete();

        let member = message.mentions.members.first() || message.guild.members.fetch(args[0]).then(u => u = member);
        if(!member) return message.reply("Could not find user.");

        // if(member.hasPermission("BAN_MEMBERS") || member.user.bot) return message.reply("This user can't be reported.");

        if(!args[1]) return message.reply("Please, provide a reason");

        //TODO: fix channel find with message.guild.channels.cache
        // let channel = message.guild.channels.fetch(channel => channel.name === "reports").then(chan => chan = channel);

        // if(!channel) return message.channel.send("Could not find a \`#report\` channel");

        const embed = new MessageEmbed()
            .setColor("#b0005e")
            .setTimestamp()
            .setFooter(message.guild.name, message.guild.iconURL)
            .setAuthor("Reported member", member.user.displayAvatarURL)
            .setDescription(stripIndents`**> Member:** ${member} (${member.id})
            **> Reported by:** ${message.member} (${message.member.id})
            **> Reason:** ${args.slice(1).join(" ")}
            **> Channel:** ${message.channel}`);
        
        return message.channel.send(embed);
    }
}