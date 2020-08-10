module.exports = {
    name: "ping",
    aliases: ["pong"],
    category: "info",
    description: "Give the ping of the bot and the API",
    usage: "",
    run: async (client, message, args) => {
        const msg = await message.channel.send(`Pinging...`);
    
        msg.edit(`Latency is ${Math.floor(msg.createdAt - message.createdAt)}ms\nAPI Latency is ${Math.round(client.ping)}ms`);
    }
}