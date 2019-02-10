const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});
const fs = require("fs");
const mysql = require("mysql");
bot.commands = new Discord.Collection();
bot.servers = {};
bot.inter = {};
let cooldown = new Set();
const sqlFunction = require("./utils/sqlFunction.js");
const pA = require("./utils/preparedAnswer.js");
const iA = require("./utils/iaFunction.js");
const nodemailer = require("nodemailer");
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var sql = mysql.createConnection({
    host: "95.179.208.160",
    user: "root",
    password: "Imaddu44lekikoo",
    database: "rem"
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    auth: {
      user: 'volnetiks@gmail.com',
      pass: 'Imaddu44lekikoo'
    }
});

fs.readdir("./commands/", (err, file) => {
    if(err) console.log(err);

    let jsfile = file.filter(f => f.split(".").pop() === "js");
    if(jsfile.length <= 0) {
        console.log("Couldn't find commands.");
        return;
    }

    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        bot.commands.set(props.help.name, props);
    });
});

bot.on("ready", async () => {
    sql.connect(function(err) {
        if(err) throw err;
        console.log("Connected!")
    })

    console.log(`Ready to serve on ${bot.guilds.size} servers, for ${bot.users.size} users.`);
    bot.user.setPresence({ game: { name: `on ${bot.guilds.size} servers` }, status: 'online' });
});

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    if(message.content.startsWith("<@521231107736207370>")) {
        pA.preparedAnswer(message.content.toLowerCase(), message.author, message, sql, iA);
    }
    if(message.content.toLowerCase().includes("ur mom gay")) return message.reply("no u");

    let prefixes = "rem!";

    sql.query(`CREATE TABLE IF NOT EXISTS \`rem\`.\`${message.guild.id}\` ( \`id\` BIGINT(20) NOT NULL , \`xp\` BIGINT(20) NOT NULL ) ENGINE = MyISAM`,[], function(err) {
        if(err) throw err;

        sql.query(`SELECT * FROM \`${message.guild.id}\` WHERE id = ?`, [message.author.id], function(err, result) {
            if(err) throw err;
            if(!result[0]) {
                sql.query(`INSERT INTO \`${message.guild.id}\`(id, xp) VALUES(?, ?)`, [message.author.id, 1], function(err, result) {
                    if(err) throw err;

                    let xp = Math.floor(Math.random() * 5);
                    sqlFunction.addXp(message.guild, message.author, xp, sql);
                });
            } 
        });
    });

    sql.query(`SELECT * FROM server WHERE id = ?`, message.guild.id, function(err, result) {
        if(err) return message.channel.send("An error has occured, please try again");

        if(!result[0]) {
            sqlFunction.createServerMessage(message, sql);
        }

        sql.query(`SELECT prefix FROM server WHERE id = ?`, message.guild.id, function(err, result) {
            if(err) return message.channel.send("An error has occured, please try again.");

            let messageArray = message.content.split(" ");
            let cmd = messageArray[0];
            let args = messageArray.slice(1);

            if(message.channel.name === "interchat") {
                if(!bot.inter[message.author.id]) {
                    return message.reply("You didnt set a server, please use rem!inter <servername>");
                }

                let guildM = bot.inter[message.author.id];
                let guild = bot.guilds.find(g => g.name === guildM);
                if(!guild) return message.reply("I cant find the guild, please check if the guild exis and check if i'm in the guild.");
                let c = guild.channels.find(c => c.name === "interchat");
                if(!c) return message.reply("I cant find the interchat channel!");
                c.send(`${message.author.tag}: ${message.content}`);
            }

            prefixes = result[0].prefix;
            if(!message.content.startsWith(prefixes)) return;
            
            let commandFile = bot.commands.get(cmd.slice(prefixes.length));
            if(commandFile) {
                commandFile.run(bot, message, args, sql);
            }
        })
    });

});


bot.on("guildMemberAdd", (member) => {
    let Wchannel;
    var message;
    let role;

    sql.query(`SELECT * FROM server WHERE id = ?`, member.guild.id, function(err, result) {

        if(!result[0]) {
            sqlFunction.createServer(member, sql);
        }

        sql.query(`SELECT cMessage, wMessage FROM server WHERE id = ?`, member.guild.id, function(err, result) {

            Wchannel = result[0].cMessage;
            message = result[0].wMessage;
            
            let channel = member.guild.channels.find(`name`, Wchannel);
            var wMessage = message.replace("{user}", member).replace("{server}", member.guild.name);
            channel.send(wMessage);
        })

        sql.query(`SELECT dRole FROM server WHERE id = ?`, member.guild.id, function(err, result) {

            role = member.guild.roles.find(`name`, result[0].dRole);
            if(!role) return;
            member.addRole(role);
        });
    }); 
    return;
});

bot.on("guildMemberRemove", (member) => {

    let Wchannel;
    var message;

    sql.query(`SELECT * FROM server WHERE id = ?`, member.guild.id, function(err, result) {
        if(err) throw err;

        if(!result[0]) {
            sqlFunction.createServer(member, sql);
        }

        sql.query(`SELECT cMessage, lMessage FROM server WHERE id = ?`, member.guild.id, function(err, result) {
            Wchannel = result[0].cMessage;
            message = result[0].lMessage;

            let channel = member.guild.channels.find(`name`, Wchannel);
            var wMessage = message.replace("{user}", member).replace("{server}", member.guild.name);
            channel.send(wMessage);
        })
    });
    return;
});

bot.on("guildCreate", async (guild) => {
    bot.user.setPresence({ game: { name: `on ${bot.guilds.size} servers` }, status: 'online' });
    sql.query(`CREATE TABLE IF NOT EXISTS \`rem\`.\`${guild.id}\` ( \`id\` BIGINT(20) NOT NULL , \`xp\` BIGINT(20) NOT NULL ) ENGINE = MyISAM`, [], function(err) {
        if(err) throw err;
    });
});

process.on('unhandledRejection', function(error) {
    var mailOptions = {
        from: 'synarozgfx@gmail.com',
        to: 'volnetiks@gmail.com',
        subject: `Error on ${bot.user.username}`,
        text: `${error.stack}`
    };

    transporter.sendMail(mailOptions, function(err, info) {
        if(err) {
            console.log(`Mail error: ${err}`);
        }
    });
});

bot.login(botconfig.token);