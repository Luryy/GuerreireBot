const answerData = require('./data');


module.exports = function(bot){
    bot.onText(/\/guerreire (.+)/, (msg, match) => {
        const chatId = msg.chat.id;
        const resp = match[1];

        const data = answerData(msg, bot);

        for(let obj of data){
            if(obj.onText.test(resp)){
                obj.action(obj.chat, obj.answer);
                break
            }
        }


    })
}