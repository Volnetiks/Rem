const Discord = require("discord.js");

module.exports.createAccountInUsers = (pUser, message, sql) => {
    sql.query(`INSERT INTO users(id, note, wedding, bProfile) VALUES (?, ?, ?, ?)`, [pUser.user.id, "No note", "Not married", "https://cdn.discordapp.com/attachments/420616844076908556/527430594070577162/background.png"], function(err) {
        if(err) return message.channel.send("An error has occured while creating your account, please try again.");
    });
}

module.exports.createAccountInUsersAuthor = (pUser, message, sql) => {
    sql.query(`INSERT INTO users(id, note, wedding, bProfile) VALUES (?, ?, ?, ?)`, [pUser.id, "No note", "Not married", "https://cdn.discordapp.com/attachments/420616844076908556/527430594070577162/background.png"], function(err) {
        if(err) return message.channel.send("An error has occured while creating your account, please try again.");
    });
}

module.exports.createServer = (member, sql) => {
    sql.query(`INSERT INTO server(id, wMessage, lMessage, cMessage, prefix, dRole) VALUES(?, ?, ?, ?, ?, ?)`, [member.guild.id, "{user} has joined {server}", "{user} just leave {server}", "welcome", "rem!", "player"], function(err) {
        if (err) throw err;
    });
}

module.exports.createServerMessage = (message, sql) => {
    sql.query(`INSERT INTO server(id, wMessage, lMessage, cMessage, prefix, dRole) VALUES(?, ?, ?, ?, ?, ?)`, [message.guild.id, "{user} has joined {server}", "{user} just leave {server}", "welcome", "rem!", "player"], function(err) {
        if (err) throw err;
    });
}

module.exports.isMarried = (message, sql) => {
    sql.query(`SELECT wedding FROM users WHERE id = ?`, [message.author.id], function(err, result) {
        if(err) return message.channel.send("An error has occured.");

        if(result[0].wedding === "Not married") {
            return false;
        } else {
            return true;
        }
    })
}

module.exports.weedingAccept = (user, message, sql, tag1, tag2) => {
    sql.query(`UPDATE users SET wedding = ? WHERE id = ?`, [tag1, user.user.id], function(err) {
        if(err) console.log(err);
        if(err) return message.channel.send("An error has occured 1");

        sql.query(`UPDATE users SET wedding = ? WHERE id = ?`, [tag2, message.author.id], function(err) {
            if(err) console.log(err);
            if(err) return message.channel.send("An error has occured 2");

            return message.channel.send(`${user} is now married with ${message.author}!`);
        });
    });
}

module.exports.createTable = (guild, sql) => {
    
}

module.exports.createAccountInServer = (guild, sender, sql) => {
    
}

module.exports.addXp = (guild, author, xpToAdd, sql) => {
    sql.query(`SELECT xp FROM \`${guild.id}\` WHERE id = ?`, [author.id], function(err, result) {
        if(err) throw err;

        let xp = result[0].xp + xpToAdd;
        sql.query(`UPDATE \`${guild.id}\` SET xp = ? WHERE id = ?`, [xp, author.id], function(err) {
            if(err) throw err;
        });
    })
}

module.exports.addQuestion = (question, answer, user, sql) => {
    sql.query(`INSERT INTO question(question, answer, id) VALUES(?, ?, ?)`, [question, answer, user.id], function(err) {
        if(err) throw err;
    });
}