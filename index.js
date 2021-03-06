const { Client, Collection } = require("discord.js");
const { config } = require("dotenv");
const SendmailTransport = require("nodemailer/lib/sendmail-transport");

const client = new Client({
    disableEveryone: true
});

client.commands = new Collection();
client.aliases = new Collection();

config({
    path: __dirname + "/.env"
});

["command"].forEach(handler => {
    require(`./handler/${handler}`)(client);
})

client.on("ready", () => {
    console.log(`${client.user.username} is online`);
    client.user.setPresence({
        status: "online",
        game: {
            name: "me getting developed",
            type: "WATCHING"
        }
    });
});

client.on("message", async message => {
    const prefix = "r!"

    if(message.author.bot) return;
    if(!message.guild) return;
    if(!message.content.startsWith(prefix)) return;
    if(!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if(cmd.length === 0) return;

    let command = client.commands.get(cmd);
    if(!command) command = client.commands.get(client.aliases.get(cmd));
    if(command) command.run(client, message, args);

})

client.login("ODUxNTQ3NjAzMTg3MjY5NjQz.YL53gQ.07FFWZB_MgaeR0xIBMKN_cXm2w4");