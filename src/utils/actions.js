const bot = require('../configBot')

class Actions {
    
    responseOnSameChat(chat, answer){
        bot.sendMessage(chat, answer)       
    }

    async responseOnSameChatAndPrivate(chat, answer){
        await bot.sendMessage(chat.chat, answer.sameChat);
        bot.sendMessage(chat.from, answer.privateChat);
            
    }
}


module.exports = Actions