module.exports.checkValidQuestion = (questionO, questionS) => {
    let tab1 = questionO.split(" ");
    let tab2 = questionS.split(" ");
    let finded = 0;
    if(tab1.length - tab2.length >= 4) return false;
    for(let i = 0; i < tab1.length; i++) {
        if(!tab2.find(v => v === tab1[i])){
            finded++;
        }
    }
    if(finded >= 3) {
        return false;
    } else {
        return true;
    }
}

module.exports.possibleQuestion = (questionO, result) => {
    let i = 0, j = 0;
    let tab1 = questionO.split(" ");
    let results = [];
    results.answer = [];
    results.finded = [];
    let finded = 0;
    while(i < result.length) {
        let tabT = result[i].question.split(" ");
        while(j < tab1.length) {
            if(!tabT.find(v => v === tab1[i])){
                finded++;
            }
            j++;
        }
        [][i] = 
        results[i].answer = result[i].answer;
        results[i].finded = finded;
        finded = 0;
        i++;
    }
    console.log(results);

}