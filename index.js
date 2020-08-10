const { Client } = require("discord.js");

const client = new Client({
    disableEveryone: true
});

client.login(process.env.token);