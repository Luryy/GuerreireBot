const Actions = require('../../utils/actions');

const emoji = require('node-emoji')

const answerData = (msg) => { 
    const actions = new Actions();

    return(
        [
            {onText:  /eu te amo/i , answer: `Eu também te amo, ${msg.from.first_name} ${emoji.emojify(':heart:')}`, action: actions.responseOnSameChat, chat: msg.chat.id},
            {onText:  /quem (e|é) (vc|voce|você)/i , answer: `Sou o mascote da melhor federação!!`, action: actions.responseOnSameChat, chat: msg.chat.id},
            {onText:  /qual a sua miss(a|ã)/i , answer: `Formar, por meio da vivência empresarial, empreendedores comprometidos e capazes de transformar o Brasil ${emoji.emojify('🇧🇷')}`, action: actions.responseOnSameChat, chat: msg.chat.id},
            {   onText:  /qual(.*)melhor(.*) (ej|empresa)/i,
                answer: {
                    sameChat: `Não existe melhor empresa, ${msg.from.first_name}`,
                    privateChat: `Claro que é a PROTEQ`
                }, 
                action: actions.responseOnSameChatAndPrivate,
                chat: {
                    chat: msg.chat.id,
                    from: msg.from.id
                }
            },
        ]
)};

module.exports = answerData;