const { Client } = require("discord.js");
const { config } = require("dotenv");

const client = new Client({
    disableEveryone: true,
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

client.login(process.env.token);