const Discord = require("discord.js");
const Jimp = require("jimp")
const sqlFunction = require("../utils/sqlFunction.js");

module.exports.run = async (bot, message, args, sql) => {

    // if(message.author.id === "283164429619691520") {
    //     sql.query(`SELECT * FROM users WHERE id = ?`, message.author.id, function(err, result) {
    //         if(err) return message.channel.send("An error has occured, please try again");

    //         if(!result[0]) {
    //             sql.query(`INSERT INTO users(id, note) VALUES (?, ?)`, [message.author.id, "No note"], function(err) {
    //                 if(err) return message.channel.send("An error has occured while creating your account, please try again.");
    //             });
    //         }

    //         let noteP, bProfile, rank, rankP, rankXp;

    //         sql.query(`SELECT note, bProfile FROM users WHERE id = ?`, message.author.id, function(err, result) {
    //             if (err) return message.channel.send("An error has occured");

    //             noteP = result[0].note;
    //             bProfile = result[0].bProfile;

    //             sql.query(`SELECT * FROM \`${message.guild.id}\``, [], function(err, result) {
    //                 if(err) return message.channel.send("An error has occured");

    //                 let global = [];

    //                 result.sort(function(a, b) {
    //                 return a.xp + b.xp;
    //                 });

    //                 for(let i = 0; i < 10; i++) {
    //                     if(!result[i]) continue;
    //                     global[i] = result[i];
    //                 }

    //                 for(let j = 0; j < global.length; j++) {
    //                     if(global[j].id == message.author.id) {
    //                         rankP = j;
    //                         rankXp = global[j].xp;
    //                     }
    //                 }

    //                 rank = `Rank: ${rankP + 1}, ${rankXp}xp`

    //                 Jimp.read(bProfile, (err, background) => {
    //                     if(err) throw err;
    //                     background.cover(800, 200);
    //                     background.brightness(-0.5);
    //                     Jimp.loadFont("./font/ProfileFont.fnt").then(font => {
    //                         Jimp.read(message.author.displayAvatarURL)
    //                             .then(image => {
    //                                 image.resize(150, 150);
    //                                 background.blit(image, 50, 25);
    //                                 background.print(font, 225, 25, message.author.tag);
    //                                 background.print(font, 225, 75, noteP);
    //                                 background.print(font, 225, 125, rank);
    //                                 background.write('image/profile.png');
    //                                 message.channel.sendFile('image/profile.png');
    //                                 return;
    //                             })
    //                             .catch(err => {
    //                                 console.log(err);
    //                             });
    //                     });
    //                 });
    //             });
    //         });
    //     });
    //     return;
    // }

    if(args.length === 0) {
        message.channel.send("Profile Loading...").then(function (newMessage) {
            sql.query(`SELECT * FROM users WHERE id = ?`, message.author.id, function(err, result) {
                if(err) return message.channel.send("An error has occured, please try again");
    
                if(!result[0]) {
                    sqlFunction.createAccountInUsersAuthor(message.author, message, sql);
                }
    
                let noteP, wedding, weddingM, bProfile;
    
                sql.query(`SELECT note, wedding, bProfile FROM users WHERE id = ?`, message.author.id, function(err, result) {
                    if (err) return message.channel.send("An error has occured");
    
                    noteP = result[0].note;
                    wedding = result[0].wedding;
                    bProfile = result[0].bProfile;

                    if(result[0].wedding === "Not married") {
                        weddingM = "Not Married";
                    } else {
                        weddingM = `Married with ${wedding}`;
                    }
                
    
                    Jimp.read(bProfile, (err, background) => {
                        if(err) throw err;
                        background.cover(800, 200);
                        background.brightness(-0.5);
                        Jimp.loadFont("./font/ProfileFont.fnt").then(font => {
                            Jimp.read(message.author.displayAvatarURL)
                                .then(image => {
                                    image.resize(150, 150);
                                    background.blit(image, 50, 25);
                                    background.print(font, 225, 25, message.author.tag);
                                    background.print(font, 225, 75, noteP);
                                    background.print(font, 225, 125, weddingM);
                                    background.write('image/profile.png');
                                    newMessage.delete();
                                    message.channel.sendFile('image/profile.png');
                                    return;
                                })
                                .catch(err => {
                                    console.log(err);
                                });
                        });
                    });
                });
            });
            return;
        });
    } else {
        message.channel.send("Profile loading...").then(function(newMessage) {
            let pUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
            if(!pUser) return message.channel.send("The user dont exist!");

            sql.query(`SELECT * FROM users WHERE id = ?`, pUser.user.id, function(err, result) {
                if(err) return message.channel.send("An error has occured, please try again");
                
    
                if(!result[0]) {
                    sqlFunction.createAccountInUsers(pUser, message, sql);
                }
    
                let noteP, wedding, weddingM, bProfile;
    
                sql.query(`SELECT note, wedding, bProfile FROM users WHERE id = ?`, pUser.user.id, function(err, result) {
                    if (err) return message.channel.send("An error has occured");
    
                    noteP = result[0].note;
                    wedding = result[0].wedding;
                    bProfile = result[0].bProfile;

                    if(result[0].wedding === "Not married") {
                        weddingM = "Not Married";
                    } else {
                        weddingM = `Maried with ${wedding}`;
                    }
    
                    Jimp.read(bProfile, (err, background) => {
                        if(err) throw err;
                        background.cover(800, 200);
                        background.brightness(-0.5);
                        Jimp.loadFont("./font/ProfileFont.fnt").then(font => {
                            Jimp.read(pUser.user.displayAvatarURL)
                                .then(image => {
                                    image.resize(150, 150);
                                    background.blit(image, 50, 25);
                                    background.print(font, 225, 25, pUser.user.tag);
                                    background.print(font, 225, 75, noteP);
                                    background.print(font, 225, 125, weddingM);
                                    background.write('image/profile.png');
                                    newMessage.delete();  
                                    message.channel.sendFile('image/profile.png');
                                    return;
                                })
                                .catch(err => {
                                    console.log(err);
                                });
                        });
                    });
                });
            });
        return;   
        });
    }
}

module.exports.help = {
    name: "profile"
}