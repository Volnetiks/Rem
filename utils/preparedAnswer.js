module.exports.preparedAnswer = (message, author, oMessage, sql, ia) => {
   
    let question = oMessage.content.slice(22);
    sql.query(`SELECT * FROM question WHERE id = ?`, [oMessage.author.id], function(err, result) {
        if(err) return message.reply("An error has occured, please try again!");

        let i = 0;
        ia.possibleQuestion(question, result);
        while(i < result.length) {
            if(ia.checkValidQuestion(question, result[i].question)) {
                return oMessage.reply(result[i].answer)
            }
            i++;
        }

        if(message.includes("hi")) {
            return oMessage.channel.send(`Hi ${oMessage.author}`);
        } else if(message.includes("how are you") || message.includes("how r u")) {
            oMessage.channel.send("Fine, what about you?");
    
            const filter = m => m.author.id === author.id;
            oMessage.channel.awaitMessages(filter, {max: 1, time: 10000}).then(collected => {
                let answer = collected.first().content;
    
                if(answer.toLowerCase().includes("bad")) return oMessage.reply("Why?")
                else if(answer.toLowerCase().includes("yes")) return oMessage.reply("Good ^^")
                else return oMessage.reply("I dont understand your answer :sweat_smile:");
            });
        } else {
            return oMessage.reply("Sorry, i'm not able to answer :sweat_smile:");
        }
    });

    
}