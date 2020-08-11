const answerData = require('./data');

module.exports = function(bot){
    bot.onText(/\/guerreiredata (.+)/, (msg, match) => {
        const chatId = msg.chat.id;
        const resp = match[1];

        const data = answerData(msg, bot);

        for(let obj of data){
            const verify = obj.onText.exec(resp);
            if(verify){

                obj.action(chatId, verify, obj.answer);
                break
            }
        }


    })

}