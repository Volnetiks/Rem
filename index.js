const { Client, Message } = require("discord.js");
const { config } = require("dotenv");
const SendmailTransport = require("nodemailer/lib/sendmail-transport");

const client = new Client({
    disableEveryone: true
});

config({
    path: __dirname + "/.env"
});

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

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if(cmd === "ping") {
        const msg = await message.channel.send(`Pinging...`);

        msg.edit(`Latency is ${Math.floor(msg.createdAt - message.createdAt)}ms\nAPI Latency is ${Math.round(client.ping)}ms`);
    }
})

client.login(process.env.token);