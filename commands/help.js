const Discord = require("discord.js");

module.exports.run = async (bot, message, args, sql) => {

    if(!args[0]) {
        let hEmbed = new Discord.RichEmbed()
        .setTitle("Help")
        .setColor("#00c7ff")
        .setDescription("Hey! I'm Rem, this commands will help you to know everything that i can do!")
        .addField('🔨 Moderation 🔨', 'rem!help mod', true)
        .addField('📃 Other 📃', 'rem!help other', true)
        .addField("Link", "[Invite Link](https://discordapp.com/oauth2/authorize?client_id=519589586197020683&scope=bot&permissions=8)");
        return message.channel.send(hEmbed);
    }

    if(args[0] === "mod") {
        let hEmbed = new Discord.RichEmbed()
        .setTitle("Help Moderation")
        .setColor("#00c7ff")
        .setDescription("Hey! I'll show you all mod commands!")
        .addField("Moderator Commands", "``ban <user> <reason>``\n ``kick <user> <reason>``\n ``prefix <new prefix>``\n ``tempmute <user> <time>``\n ``report <user> <reason>``\n ``clear <number>``\n ``welcome <join/leave/channel> [message]``\n ``defaultRole <role>``", true)
        .addField("Arguments", "``[] Optional Argument``, ``<> Needed Argument``")
        return message.channel.send(hEmbed);
    } else if(args[0] === "other") {
        let hEmbed = new Discord.RichEmbed()
        .setTitle("Help Other")
        .setColor("#00c7ff")
        .setDescription("Hey! I'll show you all others commands!")
        .addField("Util Commands", "``profile [user]``\n ``backgroundProfile <link>``\n ``profileNote <note>``\n ``avatar [user]``\n ``botinfo``\n ``serverinfo``\n ``ping``", true)
        .addField("Funny Commands", "``hug [user]``\n ``kiss [user]``\n ``say <message>``\n ``wasted [user]``\n ``wedding [user]``\n ``osu [user]``", true)
        .addField("Music Commands", "``play <url|reseach>``\n ``stop``\n ``queue``\n ``skip``", true)
        .addField("Arguments", "``[] Optional Argument``\n ``<> Needed Argument``");
        return message.channel.send(hEmbed);
    } else {
        let hEmbed = new Discord.RichEmbed()
        .setTitle("Help")
        .setColor("#00c7ff")
        .setDescription("Hey! I'm Rem, this commands will help you to know everything that i can do!")
        .addField('🔨 Moderation 🔨', '!help mod', true)
        .addField('📃 Other 📃', '!help other', true)
        .addField("Link", "[Invite Link](https://discordapp.com/oauth2/authorize?client_id=519589586197020683&scope=bot&permissions=8)");
        return message.channel.send(hEmbed);
    }
}

module.exports.help = {
    name: "help"
}