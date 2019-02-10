const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (bot, message, args, sql) => {

    if(message.author.id === "283164429619691520") {
        if(args[0]) {
            delete require.cache[require.resolve(`./${args[0]}.js`)]
            let props = require(`./${args[0]}.js`);
            bot.commands.set(props.help.name, props);
            message.channel.send(`Succesfully reloaded: ${args[0]}`)
            return;
        }
        fs.readdir("./commands/", (err, file) => {
            if(err) console.log(err);
        
            let jsfile = file.filter(f => f.split(".").pop() === "js");
            if(jsfile.length <= 0) {
                console.log("Couldn't find commands.");
                return;
            }
        
            jsfile.forEach((f, i) => {
                delete require.cache[require.resolve(`./${f}`)]
                let props = require(`./${f}`);
                bot.commands.set(props.help.name, props);
                message.channel.send(`Succesfully reloaded: ${f}`)
            });
        });
    }

}

module.exports.help = {
    name: "reload"
}