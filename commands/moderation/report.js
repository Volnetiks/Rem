const { RichEmbed } = require("discord.js/src");
const { stripIndents } = require("common-tags");

module.exports = {
    name: "report",
    category: "moderation",
    description: "Report a server member",
    usage: "<mention/id>",
    run: async (client, message, args) => {
        if(message.deletable) message.delete();

        let member = message.mentions.members.first() || message.guild.members.get(args[0]);
        if(!member) return message.reply("Could not find user.");

        if(member.hasPermission("BAN_MEMBERS") || member.user.bot) return message.reply("This user can't be reported.");

        if(!args[1]) return message.reply("Please, provide a reason");

        const channel = message.guild.channels.find(channel => channel.name === "reports");

        if(!channel) return message.channel.send("Could not find a \`#report\` channel");

        const embed = new RichEmbed()
            .setColor("#b0005e")
            .setTimestamp()
            .setFooter(message.guild.name, message.guild.iconURL)
            .setAuthor("Reported member", member.user.displayAvatarURL)
            .setDescription(stripIndents`**> Member:** ${member} (${member.id})
            **> Reported by:** ${message.member} (${message.member.id})
            **> Reason:** ${args.slice(1).join(" ")}
            **> Channel:** ${message.channel}`);
        
        return channel.send(embed);
    }
}