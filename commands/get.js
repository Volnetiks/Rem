const Discord = require("discord.js");
const ytdl = require("ytdl-core");
var servers = {};
const { get } = require("https");

function isYoutubeURL(url) {
    if(url.match(/(youtu\.be\/|youtube\.com\/(watch\?(.*&)?v=|(embed|v)\/))([^?&'>]+)/gi)){
        return true;
    }else{
        return false;
    }
}

function search(key, query, callback) {
    var search = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&key=${key}&order=viewCount&q=${query}&type=video&videoDefinition=high`;

    get(search, {}, (res) => {
        if(res.statusCode == 429) {
            return callback("We have reached the limit of Youtube API calls, try again later");
        }

        if (res.statusCode !== 200) {
            return callback("Unknown error occured");
        }

        res.setEncoding("utf8");
        var rawData = "";
        res.on("data", (chunk) => { rawData += chunk; });
        res.on("end", () => {
            try {
                var data = JSON.parse(rawData);
                var items = [];
                data.items.forEach(video => {
                    var obj = {
                        url: "https://youtu.be/"+video.id.videoId,
                        title: video.snippet.title,
                        channelURL: "https://www.youtube.com/channel/"+video.snippet.channelId,
                        channel: video.snippet.channelTitle
                    };
                    items.push(obj);
                });
                callback(null, items);
            } catch (error) {
                return callback("Unknown error occured");
            }
        });
    })
}

module.exports.run = async (bot, message, args, sql) => {
    if(args[0]) {
        let music;

        search("AIzaSyDm4JznejZRVHCveoh0I442QAHlPazcuec", args.join(" "), (err, res) => {
            if(err) throw err;
            let embed = new Discord.RichEmbed()
            .setTitle("Youtube Reaper - Downloader")
            .setColor("#00c7ff")
            .addField(`[1] - ${res[0].title}`, `-> ${res[0].channel}`)
            .addField(`[2] - ${res[1].title}`, `-> ${res[1].channel}`)
            .addField(`[3] - ${res[2].title}`, `-> ${res[2].channel}`)
            .addField(`[4] - ${res[3].title}`, `-> ${res[3].channel}`)
            .addField(`[5] - ${res[4].title}`, `-> ${res[4].channel}`);
            message.channel.send(embed);

            music = res;
        });

        const filter = m => m.author.id === message.author.id;
        message.reply("Please, send the number that corresponds to the video you want to download, or c to cancel")
        message.channel.awaitMessages(filter, {max: 1}).then(collected => {
            if(collected.first().content === "c") {
                return message.reply("Canceled");
            } else if (collected.first().content === "1") {
                let embed = new Discord.RichEmbed()
                .setTitle("Youtube Reaper - Downloader")
                .setColor("#00c7ff")
                .setThumbnail(music[0].image)
                return message.channel.send(embed);
            } else if (collected.first().content === "2") {
                
            } else if (collected.first().content === "3") {
                
            } else if (collected.first().content === "4") {
                
            } else if (collected.first().content === "5") {
                
            } else {
                return message.reply("Cancelled, please give right answer");
            }
        });
    } else {
        return message.reply("Please, Give me a video name");
    }
}

module.exports.help = {
    name: "get"
}