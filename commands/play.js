const Discord = require("discord.js");
const ytdl = require("ytdl-core");
var servers = {};
const https = require("https");
var server = "";

function isYoutubeURL(url) {
    if(url.match(/(youtu\.be\/|youtube\.com\/(watch\?(.*&)?v=|(embed|v)\/))([^?&'>]+)/gi)){
        return true;
    }else{
        return false;
    }
}

function playOrQueue(arg, bot, message) {
    if (!bot.voiceConnections.find(val => val.channel.guild.id == message.guild.id)) {
        play(arg, bot, message);
    } else {
        if (bot.servers[message.guild.id].queue.length > 10) {
            return message.reply("There is too much queue, please wait");
        }
        ytdl.getBasicInfo(arg, (err, res) => {
            if (err) {
                return message.reply("Invalid URL");
            }
            var date = new Date(null);
            date.setSeconds(res.length_seconds);
            res.length_seconds = date.toISOString().substr(11, 8);
            bot.servers[message.guild.id].queue.push({ url: arg, name: res.title, author: res.author.name, time: res.length_seconds, img: res.thumbnail_url });;
            message.reply(`:musical_note: ${res.title} has been added to the queue`);
        });
    }
}

function play(music, bot, message) {
    if (!bot.voiceConnections.find(val => val.channel.guild.id == message.guild.id)) {
        var channel = message.member.voiceChannel;
    } else {
        var channel = bot.user.voiceChannel;
    }
    channel.join().then(conn => {
        let dispatcher = conn.playStream(ytdl(music, { filter: 'audioonly' }), { seek: 0});
        ytdl.getInfo(music, (err, info) => {
            if (err) {
                return message.reply("Invalid URL");
            }
            message.channel.send(`:musical_note: Actual Song : ${info.title} from ${info.author.name}`);
            dispatcher.on('end', () => {
                setTimeout(() => {
                    if (bot.servers[message.guild.id].queue.length < 1) {
                        conn.disconnect();
                        message.channel.send(":musical_note: All song have been played succesfully");
                    } else {
                        play(bot.servers[message.guild.id].queue[0].url, bot, message);
                        bot.servers[message.guild.id].queue.shift();
                    }
                }, 1500);
            });
        });
    });
}

function searchYoutube(key, query, callback) {
    var search = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&key=${key}&q=${encodeURI(query)}&type=video&videoDefinition=high`;
    https.get(search, {}, (res) => {
        if (res.statusCode == 429) {
            return callback("We have reached the limit of Youtube API calls, try again later");
        }
        if (res.statusCode !== 200) {
            return callback("Unknown error occured");
        }
        res.setEncoding("utf8");
        let rawData = "";
        res.on("data", (chunk) => { rawData += chunk; });
        res.on("end", () => {
            try {
                var data = JSON.parse(rawData);
                var items = [];
                data.items.forEach(video => {
                    var obj = {
                        url: "https://youtu.be/" + video.id.videoId,
                        title: video.snippet.title,
                        channelURL: "https://www.youtube.com/channel/" + video.snippet.channelId,
                        channel: video.snippet.channelTitle
                    };
                    items.push(obj);
                });
                callback(null, items);
            } catch (error) {
                console.log(error)
                return callback("Unknown error occured");
            }
        });
    });
}

module.exports.run = async (bot, message, args, sql) => {

    if (!args[0]) {
        return message.reply("Please, give me a link or research!");
    }
    if (!message.member.voiceChannel) {
        return message.reply("Please, join a channel");
    }
    if (!message.member.voiceChannel.joinable) {
        return message.reply("I cant join your channel");
    }

    if (!bot.servers[message.guild.id]) {
        bot.servers[message.guild.id] = { queue: [], volume: 50, radio: false };
    }

    if (ytdl.validateURL(args[0])) {
        ytdl.getBasicInfo(args[0], (err, res) => {
            if (err) {
                return message.reply("Invalid URL");
            }
            return playOrQueue(args[0], bot, message);
        });
    } else {
        searchYoutube("AIzaSyDm4JznejZRVHCveoh0I442QAHlPazcuec", args.join(" "), (err, res) => {
            if (err) {
                message.reply("Impossible research");
                return console.log(err);
            }
            if (res.length < 1) {
                return message.reply("Research dont give me any results!");
            }
            return playOrQueue(res[0].url, bot, message);
        });
    }
}

module.exports.help = {
    name: "play"
}